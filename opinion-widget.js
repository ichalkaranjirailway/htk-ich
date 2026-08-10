/* ============================================================================
   OPINION / VOTE WIDGET — shared logic for the vote widget markup that lives
   on BOTH the homepage (index.html, at the top) and opinion.html (standalone
   share page). One copy of this file, edited once, keeps both in sync.

   Load order required on the page that includes this file:
     1. firebase-app-compat.js, firebase-firestore-compat.js  (Firebase SDK)
     2. firebase-config.js   (defines FIREBASE_CONFIG)
     3. opinion-content.js   (defines OPINION_CONTENT, optional — falls back
                              to the Marathi defaults below if missing)
     4. opinion-widget.js    (this file)

   The HTML markup this file expects is the block with id="opinion-widget" —
   see opinion.html or the top of index.html for the exact markup to copy.
   ============================================================================ */
(function(){

  let db = null;
  if (typeof FIREBASE_CONFIG !== 'undefined' && FIREBASE_CONFIG.apiKey.indexOf('PASTE_YOUR') === -1) {
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
    }
    db = firebase.firestore();
  }

  // ---- Editable text (admin panel controls this via opinion-content.js) ----
  const OPINION_DEFAULTS = {
    eyebrow: "इचलकरंजी रेल्वे कृती समिती",
    heroTitle: "इचलकरंजीला रेल्वे हवी का?",
    heroSub: "३० सेकंदात तुमचं मत नोंदवा. जमा झालेली सर्व मतं रेल्वे प्रशासन आणि लोकप्रतिनिधींपर्यंत पुराव्यासहित पोहोचवली जातील.",
    popNoteNum: "६ लाख",
    popNoteText: "नागरिकांचा हा प्रश्न आहे — तुमचा आवाजही मोजला जाईल.",
    yesLabel: "होय, रेल्वे हवी",
    noLabel: "नाही",
    voteHint: "वरील दोनपैकी एका बटणावर फक्त एकदा क्लिक करा.",
    detailTitle: "तुमची माहिती (ऐच्छिक)",
    detailNote: "नाव व मोबाईल दिल्यास मत अधिक विश्वासार्ह ठरतं — रेल्वे प्रशासनाला हे खरे नागरिक आहेत हे सिद्ध करता येतं. माहिती फक्त याच कामासाठी वापरली जाईल.",
    submitLabel: "मत नोंदवा",
    skipLabel: "माहिती न देता फक्त मत नोंदवा",
    thanksTitle: "धन्यवाद! तुमचं मत नोंदवलं गेलं.",
    thanksText: "आता कृपया खाली दिलेल्या बटणावरून हे तुमच्या ५ ओळखीच्या लोकांना/ग्रुप्सना पाठवा — जितकी जास्त मतं, तितका आवाज मोठा.",
    shareLine: "हे सर्वांपर्यंत पोहोचवा —",
    shareMessage: "इचलकरंजीला रेल्वे हवी का? तुमचं मत ३० सेकंदात नोंदवा 🚂",
    footer: "इचलकरंजी रेल्वे कृती समिती  •  ही मोहीम पूर्णपणे नागरिकांच्या पुढाकाराने चालवली जाते"
  };
  const OC = Object.assign({}, OPINION_DEFAULTS, (typeof OPINION_CONTENT !== 'undefined' ? OPINION_CONTENT : {}));

  function applyOpinionContent(){
    document.getElementById('opEyebrow').textContent = OC.eyebrow;
    document.getElementById('opHeroTitle').textContent = OC.heroTitle;
    document.getElementById('opHeroSub').textContent = OC.heroSub;
    document.getElementById('opPopNum').textContent = OC.popNoteNum;
    document.getElementById('opPopText').textContent = OC.popNoteText;
    document.getElementById('opYesLabel').textContent = OC.yesLabel;
    document.getElementById('opNoLabel').textContent = OC.noLabel;
    document.getElementById('opVoteHint').textContent = OC.voteHint;
    document.getElementById('opDetailTitle').textContent = OC.detailTitle;
    document.getElementById('opDetailNote').textContent = OC.detailNote;
    document.getElementById('submitBtn').textContent = OC.submitLabel;
    document.getElementById('skipBtn').textContent = OC.skipLabel;
    document.getElementById('opThanksTitle').textContent = OC.thanksTitle;
    document.getElementById('opThanksText').textContent = OC.thanksText;
    document.getElementById('opShareLine').textContent = OC.shareLine;
    document.getElementById('opFooter').textContent = OC.footer;
  }
  applyOpinionContent();

  // आधीच या ब्राऊझरवरून मत दिलं असेल तर परत विचारू नका — सरळ धन्यवाद पॅनल दाखवा
  if (localStorage.getItem('htk_ich_voted') === 'true') {
    document.getElementById('voteStep').style.display = 'none';
    document.getElementById('thanksPanel').classList.add('show');
  }

  // ---------------------------------------------------------------------
  // DUPLICATE-SUBMISSION FIX
  // प्रत्येक ब्राऊझर/फोनला एकच कायमचा ID दिला जातो (localStorage मध्ये साठवून).
  // तोच ID Firestore document ID म्हणून वापरला जातो (.add() ऐवजी .doc(id).set()).
  // यामुळे स्लो नेटवर्कवर युजरने page reload करून किंवा error आल्यावर परत
  // "मत नोंदवा" दाबलं, तरी तीच entry पुन्हा update होते — नवीन duplicate entry
  // तयार होत नाही, आणि होय/नाही counter सुद्धा फक्त एकदाच वाढतो.
  // ---------------------------------------------------------------------
  function getVoterId(){
    let id = localStorage.getItem('htk_ich_voter_id');
    if (!id) {
      id = (window.crypto && crypto.randomUUID)
        ? crypto.randomUUID()
        : 'v-' + Date.now() + '-' + Math.random().toString(36).slice(2);
      localStorage.setItem('htk_ich_voter_id', id);
    }
    return id;
  }

  let chosenVote = null;
  // Slow network वर युजर बटण पटापट 2-3 वेळा टॅप करतो (काहीच response न दिसल्याने),
  // आणि ते सगळे टॅप बटण disable होण्याआधीच रजिस्टर होऊ शकतात. त्यामुळे फक्त
  // btn.disabled वर अवलंबून न राहता, हा स्वतंत्र flag पहिल्याच ओळीत चेक करतो —
  // यामुळे duplicate सबमिशन (एकाच व्यक्तीची नोंद 2-3 वेळा) पूर्णपणे थांबते.
  let isSubmitting = false;

  window.owSelectVote = function(vote){
    chosenVote = vote;
    document.getElementById('voteStep').style.display = 'none';
    document.getElementById('detailPanel').classList.add('show');
    document.getElementById('detailPanel').scrollIntoView({behavior:'smooth', block:'center'});
  };

  async function bumpCounter(vote){
    // आधी इथे 'transaction' (आधी वाच, मग +1 करून लिही) वापरलं होतं — पण साईटवर
    // एकाच वेळी अनेक लोक मत नोंदवत असताना (आणि नेटवर्क स्लो असताना) transaction
    // वारंवार अडायची, त्यामुळे error यायचा आणि counter गोठून राहायचा.
    // FieldValue.increment() ही एकाच पावलात होणारी, अणुक (atomic) पद्धत आहे —
    // वाचायची गरजच नाही, त्यामुळे गर्दीतही न अडता नेहमी यशस्वी होते.
    const ref = db.collection('meta').doc('counts');
    const field = vote === 'होय' ? 'yes' : 'no';
    await ref.set({
      [field]: firebase.firestore.FieldValue.increment(1)
    }, { merge: true });
  }

  window.owSubmitVote = async function(skipDetails){
    // गार्ड — आधीच एक सबमिशन चालू असेल तर हा दुसरा/तिसरा टॅप इथेच थांबतो.
    if (isSubmitting) return;
    isSubmitting = true;

    const voterId = getVoterId();
    const name   = skipDetails ? '' : document.getElementById('fname').value.trim();
    const mobile = skipDetails ? '' : document.getElementById('fmobile').value.trim();
    const area   = skipDetails ? '' : document.getElementById('farea').value.trim();
    const btn    = document.getElementById('submitBtn');
    const skipBtn= document.getElementById('skipBtn');
    const errEl  = document.getElementById('submitErr');
    const origBtnText  = btn ? btn.textContent : '';
    const origSkipText = skipBtn ? skipBtn.textContent : '';

    errEl.classList.remove('show');
    if (btn) { btn.disabled = true; btn.textContent = 'पाठवत आहे...'; }
    if (skipBtn) { skipBtn.disabled = true; }

    if (db) {
      try {
        const voteRef = db.collection('votes').doc(voterId);
        // हा voterId आधीच एकदा यशस्वीपणे मत नोंदवून गेला आहे का, ते आधी बघतो —
        // असेल तर counter परत वाढवायचा नाही (नाहीतर retry केल्यावर counter
        // चुकीचा फुगत राहील).
        const existingSnap = await voteRef.get();
        const alreadyCounted = existingSnap.exists;

        // .add() ऐवजी .doc(voterId).set(..., {merge:true}) — त्यामुळे retry/
        // reload झाल्यावर नवीन entry न बनता तीच entry अद्ययावत होते.
        await voteRef.set({
          vote: chosenVote,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        if (name || mobile || area) {
          await db.collection('voter_details').doc(voterId).set({
            vote: chosenVote, name, mobile, area,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          }, { merge: true });
        }
        // सार्वजनिक यादीसाठी — फक्त नाव + परिसर (मोबाईल नंबर कधीच नाही)
        if (name || area) {
          await db.collection('voter_public').doc(voterId).set({
            name, area,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          }, { merge: true });
        }
        if (!alreadyCounted) {
          await bumpCounter(chosenVote);
        }
        // या ब्राऊझरवर मत नोंदवलं गेल्याची खूण साठवा — परत विचारू नये म्हणून
        localStorage.setItem('htk_ich_voted', 'true');
      } catch (e) {
        isSubmitting = false;
        if (btn) { btn.disabled = false; btn.textContent = origBtnText; }
        if (skipBtn) { skipBtn.disabled = false; skipBtn.textContent = origSkipText; }
        errEl.classList.add('show');
        return; // don't show thank-you if the write actually failed
      }
    }

    document.getElementById('detailPanel').classList.remove('show');
    document.getElementById('thanksPanel').classList.add('show');
    document.getElementById('thanksPanel').scrollIntoView({behavior:'smooth', block:'center'});
    loadCounts();
    // सार्वजनिक यादी वेगळं काही करायची गरज नाही — ती आधीच "live" (onSnapshot) आहे,
    // त्यामुळे नवीन एंट्री आपोआप यादीत दिसेल.
  };

  // Share links — WhatsApp, Facebook, Twitter/X.
  // Instagram has no direct web share link, so "अजून पर्याय" uses the native
  // share sheet instead (shows Instagram Direct/Story automatically if installed).
  const shareUrl  = window.location.href;
  const shareText = OC.shareMessage;
  document.getElementById('waShare').href = "https://wa.me/?text=" + encodeURIComponent(shareText + "\n" + shareUrl);
  document.getElementById('fbShare').href = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(shareUrl);
  document.getElementById('twShare').href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(shareText) + "&url=" + encodeURIComponent(shareUrl);

  const moreBtn = document.getElementById('moreShare');
  if (navigator.share) {
    moreBtn.style.display = 'inline-flex';
    moreBtn.addEventListener('click', () => {
      navigator.share({ title: OC.heroTitle, text: shareText, url: shareUrl }).catch(()=>{});
    });
  }

  // Live counter — reads a single small doc, so it stays cheap at any scale
  function loadCounts(){
    if (!db) return;
    db.collection('meta').doc('counts').get().then(doc => {
      if (!doc.exists) return;
      const { yes = 0, no = 0 } = doc.data();
      if (yes + no === 0) return;
      document.getElementById('yesNum').textContent = yes;
      document.getElementById('noNum').textContent = no;
      document.getElementById('totalNum').textContent = yes + no;
      document.getElementById('board').classList.remove('hidden');
    }).catch(()=>{});
  }
  loadCounts();

  // सार्वजनिक "Live" यादी — नाव + परिसर (फोन नंबर नाही) — सगळ्यांना दिसते, login लागत नाही.
  // onSnapshot वापरल्यामुळे कोणीही नवीन मत दिलं की सगळ्यांच्या पानावर आपोआप,
  // page refresh न करता, लगेच अपडेट होतं — Change.org च्या "recently signed" सारखं.
  function timeAgo(date){
    if (!date) return '';
    const sec = Math.floor((Date.now() - date.getTime()) / 1000);
    if (sec < 60) return 'आत्ताच';
    const min = Math.floor(sec / 60);
    if (min < 60) return min + ' मि. पूर्वी';
    const hr = Math.floor(min / 60);
    if (hr < 24) return hr + ' तास पूर्वी';
    const day = Math.floor(hr / 24);
    return day + ' दिवस पूर्वी';
  }

  function startPublicVotersLiveFeed(){
    if (!db) return;
    const listEl = document.getElementById('publicVotersList');
    if (!listEl) return;

    db.collection('voter_public').orderBy('timestamp', 'desc').limit(50)
      .onSnapshot(snapshot => {
        if (snapshot.empty) {
          listEl.innerHTML = '<p style="opacity:.7;">अजून कोणी नाव नोंदवलेलं नाही.</p>';
          return;
        }
        let html = '<ol style="padding-left:20px;margin:0;">';
        snapshot.forEach(doc => {
          const d = doc.data();
          const name = d.name ? String(d.name) : '';
          const area = d.area ? String(d.area) : '';
          if (!name && !area) return;
          const ts = d.timestamp && d.timestamp.toDate ? d.timestamp.toDate() : null;
          const when = ts ? timeAgo(ts) : '';
          html += '<li>' + (name || '—') + (area ? ' — <em>' + area + '</em>' : '')
                + (when ? ' <span style="opacity:.6;font-size:12px;">(' + when + ')</span>' : '') + '</li>';
        });
        html += '</ol>';
        listEl.innerHTML = html;
        const section = document.getElementById('publicVotersSection');
        if (section) section.classList.remove('hidden');
      }, () => {}); // silently ignore errors (e.g. offline)
  }
  startPublicVotersLiveFeed();

  // ---------------------------------------------------------------------
  // LIVE SHARE MESSAGE (नवीन, addition-only) — WhatsApp/Twitter शेअर मेसेजमध्ये
  // सध्याचा एकूण वोट काउंट + "किती दिवस बाकी" आपोआप, live दिसतं.
  // वरच्या कोणत्याही ओळीला हात लावलेला नाही — हे फक्त शेवटी जोडलेलं आहे.
  // कुठेही चूक झाली तरी (try/catch मुळे) बाकीचं पान/वोटिंग अजिबात थांबणार नाही.
  // ---------------------------------------------------------------------
  try {
    const VOTING_END = new Date("2026-08-19T00:00:00+05:30"); // 18 ऑगस्ट रात्री १२ (IST)
    let lastKnownTotal = 0;

    function daysLeftLabel(){
      const diff = VOTING_END - new Date();
      if (diff <= 0) return "मुदत संपली — तरीही मत द्या!";
      const d = Math.ceil(diff / (1000*60*60*24));
      if (d <= 1) return "आजचा शेवटचा दिवस!";
      return "फक्त " + d + " दिवस बाकी";
    }

    // पानावर दिसणारा banner — पूर्णपणे JS मधून तयार केला जातो, त्यामुळे
    // कोणत्याही HTML/CSS फाईलला हात लावायची गरज नाही. वोट बटणांच्या अगदी वर दिसेल.
    let countdownEl = null;
    try {
      const trackEl = document.querySelector('#opinion-widget .track');
      if (trackEl && trackEl.parentNode) {
        countdownEl = document.createElement('div');
        countdownEl.id = 'liveCountdownBanner';
        countdownEl.style.cssText =
          'max-width:520px;margin:0 auto 18px;padding:12px 18px;' +
          'background:#12283A;border:1px solid #D4AF37;border-radius:12px;' +
          'text-align:center;font-family:"IBM Plex Sans",sans-serif;' +
          'font-size:15px;font-weight:600;color:#F3D27A;';
        trackEl.parentNode.insertBefore(countdownEl, trackEl);
      }
    } catch (e) { /* बॅनर न दिसल्यास फक्त तेवढंच वगळलं जाईल, बाकी पान सुरळीत राहील */ }

    function updateShareLinksWithLiveCount(total){
      try {
        const countPart = (typeof total === 'number' && total > 0)
          ? "आतापर्यंत " + total.toLocaleString('en-IN') + " जणांनी मत दिलं — "
          : "";
        const urgency = daysLeftLabel();

        // 1) शेअर मेसेज (WhatsApp/Twitter)
        const liveText = OC.shareMessage + "\n" + countPart + urgency;
        const waEl = document.getElementById('waShare');
        const twEl = document.getElementById('twShare');
        if (waEl) waEl.href = "https://wa.me/?text=" + encodeURIComponent(liveText + "\n" + shareUrl);
        if (twEl) twEl.href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(liveText) + "&url=" + encodeURIComponent(shareUrl);
        // Facebook जाणूनबुजून बदललं नाही — तो og:description वापरतो, custom text वाचत नाही.

        // 2) पानावर दिसणारा live banner
        if (countdownEl) {
          countdownEl.textContent = "🚂 " + countPart + urgency;
        }
      } catch (e) { /* अपडेट फेल झालं तरी वोटिंगवर काहीही परिणाम नाही */ }
    }

    if (db) {
      db.collection('meta').doc('counts').onSnapshot(doc => {
        const { yes = 0, no = 0 } = doc.exists ? doc.data() : {};
        lastKnownTotal = yes + no;
        updateShareLinksWithLiveCount(lastKnownTotal);
      }, () => { updateShareLinksWithLiveCount(lastKnownTotal); });
    } else {
      updateShareLinksWithLiveCount(0);
    }

    // दर मिनिटाला "किती दिवस बाकी" चा मजकूर ताजा ठेवण्यासाठी (काउंट live ऐकलाच जातो)
    setInterval(() => updateShareLinksWithLiveCount(lastKnownTotal), 60000);
  } catch (e) { /* हा संपूर्ण नवीन भाग फेल झाला तरी वरचं सगळं वोटिंग लॉजिक सुरक्षित राहतं */ }

})();
