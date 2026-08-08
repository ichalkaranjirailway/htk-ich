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
    const ref = db.collection('meta').doc('counts');
    const field = vote === 'होय' ? 'yes' : 'no';
    await db.runTransaction(async (t) => {
      const snap = await t.get(ref);
      if (!snap.exists) {
        t.set(ref, { yes: field === 'yes' ? 1 : 0, no: field === 'no' ? 1 : 0 });
      } else {
        t.update(ref, { [field]: (snap.data()[field] || 0) + 1 });
      }
    });
  }

  window.owSubmitVote = async function(skipDetails){
    // गार्ड — आधीच एक सबमिशन चालू असेल तर हा दुसरा/तिसरा टॅप इथेच थांबतो.
    if (isSubmitting) return;
    isSubmitting = true;

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
        await db.collection('votes').add({
          vote: chosenVote,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        if (name || mobile || area) {
          await db.collection('voter_details').add({
            vote: chosenVote, name, mobile, area,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          });
        }
        // सार्वजनिक यादीसाठी — फक्त नाव + परिसर (मोबाईल नंबर कधीच नाही)
        if (name || area) {
          await db.collection('voter_public').add({
            name, area,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          });
        }
        await bumpCounter(chosenVote);
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

})();
   
