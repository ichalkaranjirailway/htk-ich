// Project Status Dashboard — संरचित डेटा.
// प्रत्येक field ला verification स्थिती आहे. नवीन माहिती जोडताना मूळ
// दस्तऐवजाशिवाय कुठलाही आकडा/स्थिती टाकू नका — "pending" ठेवा.
//
// verification: "verified" (🟢) | "pending" (🟡) | "context" (⚪)
const PROJECT_STATUS = {
  updatedAt: "2026-08-12",
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
      value: "प्रकल्प मंजूर नसल्याने पुढील आर्थिक तपशील सध्या शेअर करता येत नाहीत, असं मध्य रेल्वेने स्वतः नमूद केलं आहे",
      verification: "verified",
      source: "मध्य रेल्वे — RTI उत्तर, 12.08.2026",
      evidenceUrl: "evidence-detail.html?id=ev-1787383568850",
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
      label: "अद्ययावत प्रवासी/माल वाहतूक सर्वेक्षण",
      value: "अद्ययावत Traffic Survey आधीच्या (2017/2020) DPR नंतर पुन्हा झाल्याचा पुरावा सध्या उपलब्ध नाही",
      verification: "pending",
      source: null,
      evidenceUrl: null,
    },
  ],
};
