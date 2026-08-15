/* ============================================================================
   CAMPAIGN EXTRAS — जोडण्यात आलेल्या ३ नवीन गोष्टी, एका वेगळ्या फाईलमध्ये:
     1) "अधिकाऱ्यांना थेट कळवा" mailto बटण (खरी मतसंख्या वापरून, कोणताही
        वैयक्तिक तपशील — नाव/मोबाईल — मेलमध्ये कधीही जात नाही)
     2) ४ लाख लोकसंख्येच्या तुलनेत अंदाजित कुटुंब-पोहोच दाखवणारा progress gauge
     3) "तुम्ही आतापर्यंत किती जणांना पाठवलं" share counter (फक्त तुमच्याच
        ब्राऊझरमध्ये localStorage मध्ये मोजलं जातं)

   हे फाईल opinion-widget.js नंतर लोड होते आणि त्याच्या कोडला अजिबात हात
   लावत नाही — फक्त तयार असलेला Firebase app (आधीच initialize झालेला)
   वाचण्यासाठी वापरते. संपूर्ण फाईल try/catch मध्ये आहे — यात काहीही
   चुकलं, तरी मतदान/साईटच्या बाकी भागावर काहीही परिणाम होणार नाही.
   ============================================================================ */
(function(){
  try {

    var db = null;
    if (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length) {
      db = firebase.firestore();
    }

    var widget = document.getElementById('opinion-widget');
    if (!widget) return;

    var SITE_URL = "https://ichalkaranjirailway.github.io/htk-ich/";
    var TOTAL_POPULATION = 400000; // ४ लाख
    var FAMILY_SIZE = 4;

    // --------------------------------------------------------------------
    // १) लोकसंख्या-पोहोच Progress Gauge — track (🚂) च्या खालीच बसवतो
    // --------------------------------------------------------------------
    var gaugeWrap = null, gaugeFill = null, gaugeText = null;
    try {
      var trackEl = widget.querySelector('.track');
      if (trackEl && trackEl.parentNode) {
        gaugeWrap = document.createElement('div');
        gaugeWrap.id = 'reachGaugeWrap';
        gaugeWrap.style.cssText =
          'max-width:520px;margin:0 auto 18px;padding:14px 18px;' +
          'background:linear-gradient(180deg,#12283A,#0E2130);border:1px solid #D4AF37;' +
          'border-radius:16px;font-family:"IBM Plex Sans",sans-serif;' +
          'box-shadow:0 6px 20px rgba(0,0,0,.35);';

        gaugeText = document.createElement('div');
        gaugeText.style.cssText = 'font-size:13px;color:#F3D27A;margin-bottom:8px;text-align:center;line-height:1.6;';
        gaugeText.textContent = 'मतमोजणी सुरू आहे...';
        gaugeWrap.appendChild(gaugeText);

        var track = document.createElement('div');
        track.style.cssText = 'width:100%;height:10px;background:#0B1F2E;border:1px solid rgba(212,175,55,.35);border-radius:6px;overflow:hidden;';
        gaugeFill = document.createElement('div');
        gaugeFill.style.cssText = 'height:100%;width:0%;background:linear-gradient(90deg,#D4AF37,#F3D27A);transition:width .6s ease;';
        track.appendChild(gaugeFill);
        gaugeWrap.appendChild(track);

        var note = document.createElement('div');
        note.style.cssText = 'font-size:10.5px;color:#9FB0BA;margin-top:6px;text-align:center;';
        note.textContent = 'टीप: कुटुंब-पोहोच हा अंदाज आहे (सरासरी कुटुंब आकार ~4 धरून) — प्रत्यक्ष पडताळणीयोग्य आकडा वर मतमोजणीत दिसतो.';
        gaugeWrap.appendChild(note);

        trackEl.parentNode.insertBefore(gaugeWrap, trackEl);
      }
    } catch (e) { /* gauge न दिसल्यास फक्त तेवढंच वगळलं जाईल */ }

    function updateGauge(total){
      if (!gaugeText || !gaugeFill) return;
      try {
        var reach = total * FAMILY_SIZE;
        var pct = Math.min(100, (reach / TOTAL_POPULATION) * 100);
        gaugeFill.style.width = pct.toFixed(1) + '%';
        if (total > 0) {
          gaugeText.textContent =
            '✅ ' + total.toLocaleString('en-IN') + ' मतं जमा  ·  अंदाजे ' +
            reach.toLocaleString('en-IN') + ' लोकांपर्यंत पोहोच  ·  ४,००,००० पैकी ' +
            pct.toFixed(1) + '%';
        } else {
          gaugeText.textContent = 'पहिलं मत तुमचं असू शकतं — आत्ताच नोंदवा!';
        }
      } catch (e) {}
    }

    // --------------------------------------------------------------------
    // २) "अधिकाऱ्यांना थेट कळवा" mailto बटण — share विभागाखाली.
    //    मजकूर (to/cc/subject/body) आणि सक्रिय-होण्याची वेळ आता
    //    mail-config.js (MAIL_CONFIG) मधून येते — admin.html च्या नवीन
    //    "📧 अधिकाऱ्यांना कळवणारा Email" टॅबमधून बदलता येते. mail-config.js
    //    काही कारणाने लोड झालं नाही, तरी खालचे defaults वापरले जातात —
    //    बटण कधीही पूर्ण तुटणार नाही.
    // --------------------------------------------------------------------
    var MC = (typeof MAIL_CONFIG !== 'undefined') ? MAIL_CONFIG : {
      to: 'mr@rb.railnet.gov.in',
      cc: 'crb@rb.railnet.gov.in,secyrb@rb.railnet.gov.in,gm@cr.railnet.gov.in,drm@pa.railnet.gov.in',
      subject: 'हातकणंगले–इचलकरंजी रेल्वे मार्ग त्वरित मंजूर करावा — नागरिक मत सर्वेक्षण (इचलकरंजी रेल्वे कृती समिती)',
      bodyTemplate: 'मा. महोदय,\n\nमी इचलकरंजी रेल्वे कृती समितीच्या "इचलकरंजीला रेल्वे हवी का?" या नागरिक मत सर्वेक्षणाच्या माध्यमातून आपणास कळवत आहे.\n\n{{STAT_LINE}}\n\nहातकणंगले–इचलकरंजी या केवळ ८ किमी अंतराच्या ब्रॉडगेज रेल्वे मार्गाचा सुधारित DPR दिनांक ०२.०१.२०२० रोजी ₹१८०.७३ कोटी खर्चासह सादर करण्यात आला आहे, परंतु अद्याप रेल्वे बोर्डाकडून मंजुरी मिळालेली नाही. इचलकरंजी — "महाराष्ट्राचे मँचेस्टर" — येथे ५०,०००+ पॉवरलूम्स असून दैनंदिन अंदाजे ₹१३६ कोटींचे कापड उत्पादन होते, तरीही शहराला थेट रेल्वे कनेक्टिव्हिटी नाही.\n\nकृपया हा प्रकल्प तातडीने मंजूर करून पुढील कार्यवाही करावी, ही नम्र विनंती.\n\nसंपूर्ण पुरावा व तपशीलांसाठी: {{SITE_URL}}\n\nकळावे,\n[तुमचं नाव]\n[तुमचं शहर/परिसर]\n\n— इचलकरंजी रेल्वे कृती समिती',
      unlockAt: '2026-08-19T00:00:00+05:30',
      buttonLabel: '📧 अधिकाऱ्यांना थेट कळवा (ईमेल)',
      unlockedHint: 'तुमचं स्वतःचं ईमेल अॅप उघडेल — तयार मसुदा तुम्ही बघून, नाव टाकून थेट पाठवू शकता.',
      lockedHint: '🔒 हे बटण सर्वेक्षण संपल्यावर, १९ ऑगस्टच्या पहाटेपासून सक्रिय होईल.'
    };

    var unlockTime = new Date(MC.unlockAt);
    var unlockTimeValid = !isNaN(unlockTime.getTime());

    function isUnlocked(){
      return !unlockTimeValid || new Date() >= unlockTime;
    }

    var officialsBtn = null, officialsHint = null;
    try {
      var shareDiv = widget.querySelector('.share');
      if (shareDiv) {
        officialsBtn = document.createElement('button');
        officialsBtn.type = 'button';
        officialsBtn.id = 'mailOfficialsBtn';
        officialsBtn.className = 'share-btn';
        officialsBtn.style.cssText =
          'margin-top:10px;background:#7A1F1F;color:#fff;width:100%;justify-content:center;transition:opacity .3s ease;';
        shareDiv.appendChild(officialsBtn);

        officialsHint = document.createElement('p');
        officialsHint.style.cssText = 'font-size:11px;color:#9FB0BA;text-align:center;margin:6px 0 0;';
        shareDiv.appendChild(officialsHint);

        function refreshButtonState(){
          if (isUnlocked()) {
            officialsBtn.disabled = false;
            officialsBtn.style.opacity = '1';
            officialsBtn.style.cursor = 'pointer';
            officialsBtn.textContent = MC.buttonLabel;
            officialsHint.textContent = MC.unlockedHint;
          } else {
            officialsBtn.disabled = true;
            officialsBtn.style.opacity = '.55';
            officialsBtn.style.cursor = 'not-allowed';
            officialsBtn.textContent = MC.buttonLabel;
            officialsHint.textContent = MC.lockedHint;
          }
        }
        refreshButtonState();
        // वेळ उलटल्यावर बटण आपोआप सक्रिय व्हावं म्हणून दर मिनिटाला तपासतो —
        // पान रिफ्रेश न करताही बटण योग्य वेळी चालू होईल.
        if (!isUnlocked()) {
          var unlockCheckId = setInterval(function(){
            if (isUnlocked()) { refreshButtonState(); clearInterval(unlockCheckId); }
          }, 60000);
        }

        officialsBtn.addEventListener('click', function(){
          if (!isUnlocked()) return; // disabled असूनही क्लिक झाला तर सुरक्षा-कवच
          sendToOfficials();
        });
      }
    } catch (e) {}

    var lastKnownTotal = 0;

    function buildMailto(total){
      var to = MC.to;
      var cc = MC.cc;
      var subject = MC.subject;

      var statLine = '';
      if (total > 0) {
        var reach = total * FAMILY_SIZE;
        statLine =
          'आतापर्यंत या सर्वेक्षणात ' + total.toLocaleString('en-IN') + ' नागरिकांनी थेट, पडताळणीयोग्य मत नोंदवले आहे. ' +
          '(सरासरी कुटुंब आकार सुमारे ४ धरल्यास, अंदाजे ' + reach.toLocaleString('en-IN') + ' नागरिकांपर्यंत थेट पोहोच — ' +
          'हा एक अंदाज आहे, प्रत्यक्ष पडताळणीयोग्य संख्या ' + total.toLocaleString('en-IN') + ' आहे.)';
      } else {
        statLine = 'इचलकरंजी रेल्वे कृती समितीच्या नागरिक मत सर्वेक्षणाला सातत्याने नागरिकांचा प्रतिसाद मिळत आहे.';
      }

      var body = MC.bodyTemplate
        .split('{{STAT_LINE}}').join(statLine)
        .split('{{SITE_URL}}').join(SITE_URL);

      return 'mailto:' + encodeURIComponent(to).replace(/%40/g, '@') +
             '?cc=' + encodeURIComponent(cc) +
             '&subject=' + encodeURIComponent(subject) +
             '&body=' + encodeURIComponent(body);
    }

    function sendToOfficials(){
      try {
        window.location.href = buildMailto(lastKnownTotal);
      } catch (e) {
        alert('ईमेल उघडताना अडचण आली. कृपया पुन्हा प्रयत्न करा.');
      }
    }

    if (db) {
      db.collection('meta').doc('counts').onSnapshot(function(doc){
        var d = doc.exists ? doc.data() : {};
        var yes = d.yes || 0, no = d.no || 0;
        lastKnownTotal = yes + no;
        updateGauge(lastKnownTotal);
      }, function(){ updateGauge(lastKnownTotal); });
    } else {
      updateGauge(0);
    }

    // --------------------------------------------------------------------
    // ३) Share counter — "तुम्ही आतापर्यंत किती जणांना पाठवलं" (फक्त
    //    तुमच्याच ब्राऊझरमध्ये localStorage मध्ये मोजलं जातं)
    // --------------------------------------------------------------------
    try {
      var shareDiv2 = widget.querySelector('.share');
      if (shareDiv2) {
        var counterEl = document.createElement('p');
        counterEl.id = 'shareCounterLine';
        counterEl.style.cssText = 'font-size:12.5px;color:#F3D27A;text-align:center;margin:10px 0 0;font-weight:600;';
        var shareBtnsRow = shareDiv2.querySelector('.share-buttons');
        if (shareBtnsRow && shareBtnsRow.nextSibling) {
          shareDiv2.insertBefore(counterEl, shareBtnsRow.nextSibling);
        } else {
          shareDiv2.appendChild(counterEl);
        }

        function getShareCount(){
          var n = parseInt(localStorage.getItem('htk_ich_share_count') || '0', 10);
          return isNaN(n) ? 0 : n;
        }
        function renderShareCount(){
          var n = getShareCount();
          counterEl.textContent = n > 0
            ? '📤 तुम्ही आतापर्यंत ' + n + ' वेळा पुढे पाठवलं आहे — धन्यवाद!'
            : '';
        }
        function bumpShareCount(){
          var n = getShareCount() + 1;
          localStorage.setItem('htk_ich_share_count', String(n));
          renderShareCount();
        }
        renderShareCount();

        ['waShare','fbShare','twShare','moreShare','qrShareBtn'].forEach(function(id){
          var el = document.getElementById(id);
          if (el) el.addEventListener('click', function(){ bumpShareCount(); });
        });
      }
    } catch (e) {}

  } catch (outerErr) {
    // संपूर्ण फाईल फेल झाली तरी बाकी साईट/मतदान पूर्णपणे सुरक्षित राहतं
    console.error('campaign-extras.js:', outerErr);
  }
})();
