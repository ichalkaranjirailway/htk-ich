// Project Status Dashboard — संरचित डेटा.
// प्रत्येक field ला verification स्थिती आहे. नवीन माहिती जोडताना मूळ
// दस्तऐवजाशिवाय कुठलाही आकडा/स्थिती टाकू नका — "pending" ठेवा.
//
// verification: "verified" (🟢) | "pending" (🟡) | "context" (⚪)
const PROJECT_STATUS = {
  updatedAt: "2026-08-31",
  fields: [
    {
      label: "प्रकल्प",
      value: "हातकणंगले–इचलकरंजी नवीन ब्रॉडगेज रेल्वे मार्ग",
      verification: "verified",
      source: "मध्य रेल्वे — RTI उत्तर, 12.08.2026",
      evidenceUrl: "evidence-detail.html?id=ev-1787383568850",
    },
    {
      label: "मार्गाची लांबी",
      value: "8 किमी (हातकणंगले ↔ इचलकरंजी)",
      verification: "verified",
      source: "मध्य रेल्वे — RTI उत्तर, 12.08.2026",
      evidenceUrl: "evidence-detail.html?id=ev-1787383568850",
    },
    {
      label: "Final Location Survey",
      value: "11 जून 2017 रोजी भूमिपूजन",
      verification: "verified",
      source: "मध्य रेल्वेची अधिकृत घोषणा (RTI उत्तरात नमूद)",
      evidenceUrl: "evidence-detail.html?id=ev-1787383568850",
    },
    {
      label: "मूळ DPR",
      value: "30 नोव्हेंबर 2017 — खर्च ₹191.59 कोटी, ROR −10.11%",
      verification: "verified",
      source: "प्रकल्पाच्या अधिकृत नोंदी",
      evidenceUrl: null,
    },
    {
      label: "सुधारित DPR",
      value: "02 जानेवारी 2020 — खर्च ₹180.73 कोटी, ROR −12.73%",
      verification: "verified",
      source: "दोन स्वतंत्र स्रोत जुळतात — प्रकल्प नोंदी + मध्य रेल्वेचं 12.08.2026 चं RTI उत्तर",
      evidenceUrl: "evidence-detail.html?id=ev-1787383568850",
    },
    {
      label: "सद्यस्थिती (मंजुरी)",
      value: "रेल्वे बोर्डाच्या तपासणीत (scrutiny) — अद्याप मंजूर नाही",
      verification: "verified",
      source: "मध्य रेल्वे — RTI उत्तर, 12.08.2026",
      evidenceUrl: "evidence-detail.html?id=ev-1787383568850",
    },
    {
      label: "निधी/अंदाजपत्रकीय तपशील",
      value: "प्रकल्प मंजूर नसल्याने पुढील आर्थिक तपशील सध्या शेअर करता येत नाहीत, असं मध्य रेल्वेने स्वतः नमूद केलं आहे. मात्र 2020-22 च्या अर्थसंकल्पात केवळ ₹1,000 (नाममात्र टोकन) वितरित झाल्याचं खासदार धैर्यशील माने यांच्या 22.07.2026 च्या पत्रात नमूद आहे — 2019-20 मधल्या ₹10 लाखांच्या तुलनेत ही मोठी घट आहे.",
      verification: "verified",
      source: "मध्य रेल्वे RTI उत्तर (12.08.2026) + खासदार माने यांचं पत्र (22.07.2026)",
      evidenceUrl: "evidence-detail.html?id=ev-2026-mp-mane-letter",
    },
    {
      label: "मोठ्या योजनेशी संबंध",
      value: "हातकणंगले–इचलकरंजी 8 किमी मार्ग हा कराड–इचलकरंजी–निपाणी–बेळगाव 191.9 किमी प्रकल्पाचा भाग आहे — हा मोठा मार्ग मंजूर झाल्यास 8 किमी मार्ग आपोआप त्याला जोडला जाईल, असं खासदारांच्या पत्रात नमूद.",
      verification: "verified",
      source: "खासदार धैर्यशील माने यांचं पत्र, 22.07.2026",
      evidenceUrl: "evidence-detail.html?id=ev-2026-mp-mane-letter",
    },
    {
      label: "India Investment Grid नोंद",
      value: "केंद्र सरकार पुरस्कृत Railways sector प्रकल्प म्हणून अधिकृतपणे सूचीबद्ध",
      verification: "verified",
      source: "India Investment Grid पोर्टल (भारत सरकार)",
      evidenceUrl: null,
    },
    {
      label: "FIRR / EIRR मूल्यांकन पद्धत",
      value: "या प्रकल्पासाठी नेमकी कुठली appraisal framework/निकष वापरले गेले, याचा स्वतंत्र अधिकृत दस्तऐवज अद्याप उपलब्ध नाही",
      verification: "pending",
      source: null,
      evidenceUrl: null,
    },
    {
      label: "रेल्वे बोर्डाची मूल्यांकन पद्धत बदलली (2022-23)",
      value: "रेल्वे बोर्डाने नवीन मानकीकृत Financial Appraisal Framework (FIRR) १ एप्रिल २०२३ पासून लागू केली, आणि पत्र क्र. 2023/Gatishakti/TF/02 (दि. १४.०९.२०२३) द्वारे EIRR मूल्यांकन चौकट (मूळ चौकट दि. १९.०८.२०२२) एकत्रित केली. हातकणंगले-इचलकरंजीचा २०२० चा सुधारित DPR या दोन्ही तारखांच्या आधीचा असल्याने, प्रकल्पाचे मूल्यांकन सध्या रेल्वे बोर्ड वापरत असलेल्या पद्धतीनुसार अद्याप झालेले दिसत नाही — हा पुनर्मूल्यांकनाच्या मागणीचा महत्त्वाचा तांत्रिक आधार आहे.",
      verification: "pending",
      source: "रेल्वे बोर्ड Financial Appraisal Framework (लागू १.०४.२०२३); पत्र क्र. 2023/Gatishakti/TF/02 — दुय्यम स्रोतांद्वारे सापडलेलं, मूळ रेल्वे बोर्ड दस्तऐवज अद्याप पडताळणी बाकी",
      evidenceUrl: null,
    },
    {
      label: "अद्ययावत प्रवासी/माल वाहतूक सर्वेक्षण",
      value: "अद्ययावत Traffic Survey आधीच्या (2017/2020) DPR नंतर पुन्हा झाल्याचा पुरावा सध्या उपलब्ध नाही",
      verification: "pending",
      source: null,
      evidenceUrl: null,
    },
  ],
};
