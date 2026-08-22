// Master Timeline — इतिहास पानासाठी संरचित डेटा.
// प्रत्येक नोंदीला source + verification स्थिती आहे. नवीन नोंद जोडताना
// कुठलीही तारीख/आकडा बनवू नका — फक्त प्रत्यक्ष कागदपत्रावर आधारित नोंद करा.
//
// verification: "verified" (🟢 पुराव्यासह पडताळलेलं) |
//               "pending"  (🟡 पडताळणी आवश्यक) |
//               "context"  (⚪ ऐतिहासिक संदर्भ, स्वतंत्र दस्तऐवजी पुरावा नाही)
const TIMELINE_EVENTS = [
  {
    id: "t-1956",
    date: "1956-12-19",
    dateLabel: "19 डिसेंबर 1956",
    title: "सर्वात जुना पडताळलेला संसदीय संदर्भ",
    description: "इचलकरंजी भागाच्या रेल्वे कनेक्टिव्हिटीसंदर्भात लोकसभेच्या कामकाजातील अधिकृत नोंद (पान 53-54). सध्या उपलब्ध असलेल्या पुराव्यांमधील हा सर्वात जुना संसदीय संदर्भ आहे — यापूर्वीचा कुठलाही पडताळलेला अधिकृत दस्तऐवज अद्याप सापडलेला नाही.",
    sourceType: "Parliamentary",
    verification: "pending",
    verificationNote: "मूळ दस्तऐवज उपलब्ध आहे — तपशीलवार मजकुराचं पूर्ण वाचन व सारांश अद्याप प्रलंबित आहे.",
    evidenceUrl: "evidence-detail.html?id=ev-1956-loksabha",
  },
  {
    id: "t-1965",
    date: "1965-01-01",
    dateLabel: "1965",
    title: "इचलकरंजी नगरपालिका ठराव",
    description: "इचलकरंजी नगरपालिकेने हातकणंगले–इचलकरंजी रेल्वे मार्गाच्या मागणीसंदर्भात ठराव पारित केला — नागरिकांच्या संघटित मागणीची ही सर्वात जुनी स्थानिक प्रशासकीय नोंद आहे.",
    sourceType: "Government",
    verification: "pending",
    verificationNote: "ठरावाचा फोटो/स्कॅन गॅलरीत उपलब्ध आहे — मूळ नगरपालिका दस्तऐवज (ठराव क्रमांकासह) अद्याप Evidence Centre मध्ये औपचारिकरित्या नोंदवलेला नाही.",
    evidenceUrl: "gallery-data.js#1965",
  },
  {
    id: "t-2017-survey",
    date: "2017-06-11",
    dateLabel: "11 जून 2017",
    title: "Final Location Survey — भूमिपूजन",
    description: "मध्य रेल्वेच्या अधिकृत घोषणेनुसार, त्यावेळच्या रेल्वे मंत्र्यांच्या हस्ते या मार्गाच्या Final Location Survey साठी भूमिपूजन करण्यात आलं.",
    sourceType: "RTI",
    verification: "verified",
    verificationNote: "12.08.2026 च्या RTI उत्तरात मध्य रेल्वेने ही तारीख स्वतः नमूद केली आहे.",
    evidenceUrl: "evidence-detail.html?id=ev-1787383568850",
  },
  {
    id: "t-2017-dpr",
    date: "2017-11-30",
    dateLabel: "30 नोव्हेंबर 2017",
    title: "मूळ DPR सादर",
    description: "हातकणंगले–इचलकरंजी नवीन रेल्वे मार्गाचा (8 किमी) Detailed Project Report (DPR) रेल्वे बोर्डाकडे सादर. अंदाजित खर्च ₹191.59 कोटी, Rate of Return (ROR) −10.11%.",
    sourceType: "Official",
    verification: "verified",
    verificationNote: "प्रकल्पाच्या अधिकृत नोंदींमध्ये व साईटच्या content.js मध्ये पूर्वीपासून नमूद.",
    evidenceUrl: null,
  },
  {
    id: "t-2020-revised-dpr",
    date: "2020-01-02",
    dateLabel: "02 जानेवारी 2020",
    title: "सुधारित DPR सादर",
    description: "सुधारित Detailed Project Report रेल्वे बोर्डाकडे सादर — खर्च ₹180.73 कोटी, ROR −12.73%. हा प्रकल्प रेल्वे बोर्डाच्या तपासणीखाली (scrutiny) असल्याचं नमूद.",
    sourceType: "RTI",
    verification: "verified",
    verificationNote: "12.08.2026 च्या RTI उत्तरात मध्य रेल्वेने हीच आकडेवारी स्वतः पुन्हा पुष्टी केली आहे — दोन स्वतंत्र स्रोतांतून (content.js + RTI PDF) एकच आकडेवारी जुळते.",
    evidenceUrl: "evidence-detail.html?id=ev-1787383568850",
  },
  {
    id: "t-2026-rti",
    date: "2026-08-12",
    dateLabel: "12 ऑगस्ट 2026",
    title: "RTI उत्तर — प्रकल्प स्थिती पुष्टी",
    description: "मध्य रेल्वेच्या मुख्य प्रशासकीय अधिकाऱ्यांनी (बांधकाम) दिलेल्या RTI उत्तरात नमूद: प्रकल्प अद्याप रेल्वे बोर्डाच्या तपासणीत असून मंजूर झालेला नाही, त्यामुळे पुढील आर्थिक/निधीसंबंधित तपशील अद्याप शेअर करता येत नाहीत.",
    sourceType: "RTI",
    verification: "verified",
    verificationNote: "मूळ स्वाक्षरीयुक्त RTI उत्तर PDF स्वरूपात Evidence Centre मध्ये उपलब्ध.",
    evidenceUrl: "evidence-detail.html?id=ev-1787383568850",
  },
];
