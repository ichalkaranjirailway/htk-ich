/* ============================================================================
   CAMPAIGN EXTRAS — जोडण्यात आलेल्या गोष्टी, एका वेगळ्या फाईलमध्ये:
     1) ४ लाख लोकसंख्येच्या तुलनेत अंदाजित कुटुंब-पोहोच दाखवणारा progress gauge
     2) निकालाच्या तारखेपर्यंत (१९ ऑगस्ट) उलटगणती — वेळ उलटल्यावर स्वतःहून
        कायमची लपते, त्यामुळे मोहीम संपल्यावर पानावर शिळी उलटगणती उरत नाही
     3) १५ ऑगस्ट २०२६ रोजी gauge ला हलकासा तिरंगा accent — फक्त त्याच
        दिवशी, आपोआप — पुढे कायमस्वरूपी राहणार नाही
     4) "तुम्ही आतापर्यंत किती जणांना पाठवलं" share counter (फक्त तुमच्याच
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

    var TOTAL_POPULATION = 400000; // ४ लाख
    var FAMILY_SIZE = 4;

    // आजची तारीख १५ ऑगस्ट २०२६ आहे का — हे फक्त एकदाच ठरवून पुढे वापरतो,
    // जेणेकरून बॅनर आणि gauge चा तिरंगा accent दोन्ही एकाच नियमाने चालतील.
    var _today = new Date();
    var IS_AUG15 = (_today.getFullYear() === 2026 && _today.getMonth() === 7 && _today.getDate() === 15);

    // --------------------------------------------------------------------
    // निकाल-तारीख — फक्त वरच्या उलटगणतीसाठी वापरली जाते. opinion-widget.js
    // मधल्या VOTING_END शी जुळणारीच तारीख — दोन्हीकडे बदलायची झाल्यास
    // दोन्ही जागी बदलावी.
    // --------------------------------------------------------------------
    var unlockTime = new Date('2026-08-19T00:00:00+05:30');
    var unlockTimeValid = !isNaN(unlockTime.getTime());

    function isUnlocked(){
      return !unlockTimeValid || new Date() >= unlockTime;
    }

    // --------------------------------------------------------------------
    // १) लोकसंख्या-पोहोच Progress Gauge — track (🚂) च्या खालीच बसवतो.
    //    फक्त १५ ऑगस्ट रोजी वरती एक हलकीशी तिरंगा पट्टी दिसते — बाकी
    //    दिवशी gauge नेहमीचाच सोनेरी/नेव्ही रंगात दिसतो.
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
          'box-shadow:0 6px 20px rgba(0,0,0,.35);position:relative;overflow:hidden;';

        if (IS_AUG15) {
          var tricolorStrip = document.createElement('div');
          tricolorStrip.style.cssText =
            'position:absolute;top:0;left:0;right:0;height:4px;' +
            'background:linear-gradient(90deg,#FF9933 0 33%,#FFFFFF 33% 67%,#138808 67% 100%);';
          gaugeWrap.appendChild(tricolorStrip);
        }

        gaugeText = document.createElement('div');
        gaugeText.style.cssText = 'font-size:13px;color:#F3D27A;margin-bottom:8px;text-align:center;line-height:1.6;' + (IS_AUG15 ? 'margin-top:6px;' : '');
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
    // २) निकाल-उलटगणती — gauge च्या अगदी वरती बसते. निकालाची वेळ
    //    (unlockTime, सध्या १९ ऑगस्ट पहाट) उलटली की स्वतःहून पानातून
    //    कायमची निघून जाते — पुढे कधीही परत येऊन काढायची गरज नाही.
    // --------------------------------------------------------------------
    try {
      if (unlockTimeValid && !isUnlocked() && gaugeWrap && gaugeWrap.parentNode) {
        var countdownWrap = document.createElement('div');
        countdownWrap.id = 'resultCountdown';
        countdownWrap.style.cssText =
          'max-width:520px;margin:0 auto 12px;padding:10px 16px;text-align:center;' +
          'font-family:"IBM Plex Sans",sans-serif;font-size:13px;font-weight:600;color:#F3D27A;' +
          'background:#0E2130;border:1px solid rgba(212,175,55,.35);border-radius:12px;';
        gaugeWrap.parentNode.insertBefore(countdownWrap, gaugeWrap);

        var countdownIntervalId = null;
        function renderCountdown(){
          var diff = unlockTime - new Date();
          if (diff <= 0) {
            if (countdownWrap && countdownWrap.parentNode) countdownWrap.parentNode.removeChild(countdownWrap);
            if (countdownIntervalId) clearInterval(countdownIntervalId);
            return;
          }
          var days = Math.floor(diff / 86400000);
          var hours = Math.floor((diff % 86400000) / 3600000);
          var mins = Math.floor((diff % 3600000) / 60000);
          countdownWrap.textContent =
            '⏳ निकाल जाहीर होण्यास बाकी: ' + days + ' दिवस ' + hours + ' तास ' + mins + ' मिनिटे';
        }
        renderCountdown();
        countdownIntervalId = setInterval(renderCountdown, 60000);
      }
    } catch (e) {}

    var lastKnownTotal = 0;

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
    // ४) Share counter — "तुम्ही आतापर्यंत किती जणांना पाठवलं" (फक्त
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
