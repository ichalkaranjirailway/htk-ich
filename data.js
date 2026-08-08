/* ============================================================
   ICHALKARANJI–HATKANANGALE RAILWAY DEMAND — EVIDENCE LOG
   ============================================================
   YEH FILE TUMHI EDIT KARAYCHI AAHE. Code kuthehi touch karayla
   nako — फक्त khali dilela ENTRIES array madhe navीn entry add
   kara, exact same format वापरून.

   PRATYEK ENTRY MADHE HE FIELDS BHARA:

   id           -> unique number, pratyek entry sathi vegla (1, 2, 3...)
   date         -> "YYYY-MM-DD" format madhe (e.g. "2026-07-29")
   category     -> khालील 6 पैकी EXACT ekach shabda vaparaa:
                    "rti"        -> RTI applications & replies
                    "grievance"  -> CPGRAMS / Aaple Sarkar / online grievances
                    "petition"   -> Change.org / signature petitions
                    "letter"     -> Khasdar, Aamdar, Ministers, Jilhadhikari,
                                    Mahanagarpalika la lihilele patra
                    "social"     -> Twitter/X, Facebook posts & threads
                    "media"      -> News coverage, press notes
   title        -> Short heading (e.g. "RTI to Central Railway CPIO")
   to_whom      -> Kunala pathavla (e.g. "Railway Minister, GoI")
   description  -> 2-3 olincha plain summary — kay vicharla / kay mhanla
   response     -> Tyanni kay uttar dila (summary). Response nasel tar
                    "No response received yet." asa लिहा.
   status       -> "replied" | "pending" | "no-response"
   proofType    -> "image" | "pdf" | "link" | "text"
                    - image: /proofs/ फोल्डर madhe photo taka, tyacha filename इथे द्या
                    - pdf: /proofs/ फोल्डर madhe PDF taka, tyacha filename इथे द्या
                    - link: full https:// URL (Twitter post, Change.org, news)
                    - text: proof फक्त quote/text swaroopat असेल tar tyacha text
   proofSrc     -> proofType नुसार: filename, ki URL, ki quoted text
   referenceNo  -> Official reference/diary number असेल tar (optional, नसेल tar "")

   ============================================================
   PROOF FILES KUTHE THEVAYCHE:
   Ha project folder madhe "proofs" नावाचा folder aahe.
   Tumche scanned RTI replies, screenshots, photos tya folder
   madhe taka, ani khali proofSrc madhe फक्त filename ta
   (e.g. "rti-reply-29jul2026.jpg") — pura path lihinyachi garaj nahi.
   ============================================================ */

const ENTRIES = [
  {
    id: 3,
    date: "2026-03-02",
    category: "petition",
    title: "Change.org याचिका — \"इचलकरंजीला थेट रेल्वे कनेक्टिव्हिटी हवी!\"",
    to_whom: "केंद्रीय रेल्वे मंत्री, महाराष्ट्राचे मुख्यमंत्री, मध्य रेल्वे महाव्यवस्थापक, पुणे विभागीय रेल्वे व्यवस्थापक, भारताचे राष्ट्रपती (CPGRAMS मार्फत), आणि इतर ३ निर्णय घेणारे अधिकारी",
    description: "हातकणंगले–इचलकरंजी ८ किमी मार्ग तात्काळ राबवण्याची आणि इचलकरंजीला पूर्ण क्षमतेचे रेल्वे स्थानक (अनेक फलाट + मालवाहतूक यार्ड + पार्किंग) विकसित करण्याची मागणी. याचिकेत आर्थिक बाजू मांडली आहे: ५०,०००+ पॉवरलूम्स, दररोज ८.५७५ कोटी मीटर कापड उत्पादन (₹१३६ कोटी/दिवस), ₹११,७७३.१३ कोटी वार्षिक उलाढाल, आणि ₹७५,००० कोटींची इकोसिस्टम गुंतवणूक. भूसंपादन आणि पूर्ण अर्थसंकल्पासाठी विशिष्ट, कालबद्ध मागण्या केल्या आहेत.",
    response: "याचिका सध्या स्वाक्षऱ्यांसाठी खुली आहे — आतापर्यंत ३७७ पडताळणी झालेल्या स्वाक्षऱ्या जमा. निर्णय घेणाऱ्यांकडून अद्याप औपचारिक प्रतिसाद नाही.",
    status: "pending",
    proofType: "link",
    proofSrc: "https://www.change.org/p/ichalkaranji-deserves-direct-rail-connectivity",
    referenceNo: "",
    en: {
      title: "Change.org Petition — \"Ichalkaranji Deserves Direct Rail Connectivity!\"",
      to_whom: "Union Railway Minister, Chief Minister Maharashtra, Central Railway GM, Pune DRM, President of India (via CPGRAMS), and 3 other decision makers",
      description: "Demand to implement the Hatkanangale–Ichalkaranji 8 km line immediately and develop Ichalkaranji into a full-capacity railway station (multiple platforms + freight yard + parking). The petition lays out the economic case: 50,000+ powerlooms, 8.575 crore metres of cloth produced daily (₹136 crore/day), ₹11,773.13 crore annual turnover, and a ₹75,000 crore ecosystem investment. Specific, time-bound demands are made for land acquisition and full budget allocation.",
      response: "Petition currently open for signatures — 377 verified signatures collected so far. No formal response from decision makers yet.",
    },
  },

  {
    id: 4,
    date: "2026-03-13",
    category: "social",
    title: "इंस्टाग्राम रील — \"इचलकरंजीला रेल्वे स्टेशन हवंय!\"",
    to_whom: "जनजागृती — मुख्यमंत्री देवेंद्र फडणवीस, रेल्वे मंत्री अश्विनी वैष्णव आणि स्थानिक अधिकाऱ्यांना टॅग करून",
    description: "@manchester_of_maharashtra ची रील, @untold_ichalkaranji सोबत सहकार्याने. इचलकरंजीला रेल्वे स्थानक का हवे (८ किमीची नवीन मार्गिका, DPR तयार, अर्थसंकल्पात समावेश) यावर जनजागृती — लॉजिस्टिक्स, निर्यात आणि रोजगारावर भर. अशाच लहान मार्गिकांच्या यशोगाथा (४ किमी हैदराबाद कॉर्ड, बैराबी–सायरंग) उदाहरण म्हणून दिल्या आहेत. #ichalkaranjirailway #devendrafadnavis #ashwinivaishnaw #udaydhatunde #dhairysheelmane",
    response: "या पोस्टवर २,०६,९७६ व्ह्यूज, ९२,६२७ खाती पोहोचली, २,६६० लाइक्स, ८३ कमेंट्स, १,२०६ शेअर्स, १५३ नवीन फॉलो. टॅग केलेल्या अधिकाऱ्यांकडून अद्याप थेट उत्तर नाही.",
    status: "no-response",
    proofType: "link",
    proofSrc: "https://www.instagram.com/reel/DVy-V1hDaAP/",
    referenceNo: "",
    en: {
      title: "Instagram Reel — \"Ichalkaranji Needs a Railway Station!\"",
      to_whom: "Public awareness — tagging CM Devendra Fadnavis, Railway Minister Ashwini Vaishnaw, and local officials",
      description: "A reel by @manchester_of_maharashtra, in collaboration with @untold_ichalkaranji, raising awareness on why Ichalkaranji needs a railway station (new 8 km line, DPR ready, budget allocated) — focusing on logistics, exports and employment. Cites similar short-line success stories (4 km Hyderabad chord, Bairabi–Sairang). #ichalkaranjirailway #devendrafadnavis #ashwinivaishnaw #udaydhatunde #dhairysheelmane",
      response: "206,976 views, 92,627 accounts reached, 2,660 likes, 83 comments, 1,206 shares, 153 new follows from this post. No direct reply from tagged officials yet.",
    },
  },

  {
    id: 5,
    date: "2026-03-28",
    category: "rti",
    title: "RTI उत्तर — उप मुख्य अभियंता/बांधकाम, सातारा",
    to_whom: "उप मुख्य अभियंता/बांधकाम, मध्य रेल्वे, सातारा",
    description: "प्रकल्पाची सद्यस्थिती (भौतिक/आर्थिक प्रगती), भूसंपादनाची स्थिती, DPR ची स्थिती, मंजूर खर्च, वेळापत्रक, आणि विलंबाची कारणे — असे ७ सविस्तर प्रश्न विचारले.",
    response: "सर्व ७ प्रश्नांना एकच उत्तर: DPR रेल्वे बोर्डाकडे २०१८ मध्ये सादर करण्यात आला होता. प्रकल्पाला अद्याप रेल्वे बोर्डाकडून मंजुरी मिळालेली नाही आणि कोणतेही काम सुरू झालेले नाही.",
    status: "replied",
    referenceNo: "DRMOP/R/E/26/00107",
    en: {
      title: "RTI Reply — Dy. Chief Engineer/Const., Satara",
      to_whom: "Dy. Chief Engineer/Construction, Central Railway, Satara",
      description: "Asked 7 detailed questions on the project's current physical/financial progress, land acquisition status, DPR status, sanctioned cost, timeline, and reasons for delay.",
      response: "A single reply covering all 7 questions: the DPR was submitted to the Railway Board in 2018. The project has not yet been sanctioned by the Railway Board and no work has started.",
    },
  },

  {
    id: 6,
    date: "2026-05-14",
    category: "rti",
    title: "RTI हस्तांतरण आदेश — मध्य रेल्वे पुणे विभाग",
    to_whom: "वरिष्ठ विभागीय अभियंता (समन्वय) व CPIO, पुणे विभाग → उप मुख्य अभियंता/बांधकाम, सातारा यांच्याकडे हस्तांतरित",
    description: "RTI अर्ज कलम ६(३) अंतर्गत योग्य विभागाकडे हस्तांतरित करण्यात आला, कारण मागितलेली माहिती उप मुख्य अभियंता/बांधकाम, सातारा यांच्याशी संबंधित होती.",
    response: "RTI अधिकृतपणे १५.०५.२०२६ रोजी उप मुख्य अभियंता/बांधकाम, सातारा यांच्याकडे थेट निकालासाठी हस्तांतरित करण्यात आला.",
    status: "",
    proofType: "pdf",
    proofSrc: "6-cr-15-5-26.pdf",
    referenceNo: "DRMOP/R/P/24/00164"
  },

  {
    id: 7,
    date: "2026-05-27",
    category: "rti",
    title: "RTI पाठपुरावा — सविस्तर ७ प्रश्नांची यादी",
    to_whom: "वरिष्ठ विभागीय अभियंता (समन्वय), पुणे, प्रत CRPG, उप CPO, मध्य रेल्वे अधिकारी",
    description: "हस्तांतरित झालेल्या RTI चा पाठपुरावा — DPR ची स्थिती, PEC बैठका, विलंबाची नेमकी कारणे, सुधारित ROR/FIRR, सुधारित खर्च, कालबद्ध कृती आराखडा, आणि पिंक बुक स्थिती यावर ७ सविस्तर प्रश्न.",
    response: "अद्याप कोणतेही उत्तर मिळालेले नाही (या पाठपुराव्याच्या सादरीकरणापर्यंत).",
    status: "",
    proofType: "pdf",
    proofSrc: "7-gmail-follow-up-and-detailed-questionnaire-for-transferred-rti-application-reg-no.-drmop-r-e-26-00164-3-.pdf",
    referenceNo: "DRMOP/R/E/26/00164"
  },

  {
    id: 8,
    date: "2026-06-17",
    category: "grievance",
    title: "CPGRAMS तक्रार उत्तर — मध्य रेल्वे CAO (बांधकाम)",
    to_whom: "PMO तक्रार कक्ष (CPGRAMS) → उप CE(C)PLG व CPIO प्रदीप बनसोडे यांच्याकडून उत्तर",
    description: "इचलकरंजीची आर्थिक बाजू (महाराष्ट्राचे मँचेस्टर, मोठी मालवाहतूक क्षमता), PM गती शक्तीशी सुसंगती, आणि कराड–इचलकरंजी–निपाणी–बेळगाव सर्वेक्षण पुनरुज्जीवित करण्याची मागणी मांडली.",
    response: "मध्य रेल्वेने अधिकृतपणे पुष्टी केली: DPR प्रथम ३०.११.२०१७ रोजी सादर — खर्च ₹१९१.५९ कोटी, ROR −१०.११%. सुधारित DPR ०२.०१.२०२० रोजी सादर — खर्च ₹१८०.७३ कोटी, ROR −१२.७३%. प्रकल्प अद्याप मंजूर झालेला नाही. कराड–इचलकरंजी–निपाणी–बेळगाव व्यवहार्यता अहवाल २२.०३.२०१६ रोजी सादर झाला होता; रेल्वे बोर्डाने तो १०.०२.२०१७ रोजी बासनात गुंडाळला.",
    status: "replied",
    referenceNo: "PMOPG/E/2026/0107756",
    en: {
      title: "CPGRAMS Grievance Reply — Central Railway CAO(Const.)",
      to_whom: "PMO Grievance Cell (CPGRAMS) → answered by Dy CE(C)PLG & CPIO Pradeep Bansode",
      description: "Presented Ichalkaranji's economic case (Manchester of Maharashtra, high freight potential), alignment with PM Gati Shakti, and requested reviving the Karad–Ichalkaranji–Nipani–Belagavi survey.",
      response: "Central Railway officially confirmed: DPR first submitted 30.11.2017 — cost ₹191.59 crore, ROR -10.11%. Revised DPR submitted 02.01.2020 — cost ₹180.73 crore, ROR -12.73%. The project remains unsanctioned. The Karad–Ichalkaranji–Nipani–Belagavi feasibility report was submitted 22.03.2016; the Railway Board shelved it on 10.02.2017.",
    },
  },

  {
    id: 9,
    date: "2026-05-27",
    category: "letter",
    title: "सामाजिक-आर्थिक निकषांवर पुनर्विचारासाठी विनंती (ROR −१२.७३%)",
    to_whom: "सचिव, रेल्वे बोर्ड; प्रत अध्यक्ष रेल्वे बोर्ड, DRM पुणे, रेल्वे मंत्री कार्यालय",
    description: "नकारात्मक ROR च्या आधारावर प्रकल्प नाकारण्याऐवजी, PM गती शक्ती मार्गदर्शक तत्त्वांनुसार सामाजिक-आर्थिक निकषांवर पुनर्विचार करण्याची विनंती. ५०:५० राज्य खर्चवाटप प्रारूपाचा प्रस्ताव दिला.",
    response: "अद्याप कोणतेही उत्तर मिळालेले नाही.",
    status: "",
    proofType: "pdf",
    proofSrc: "9-gmail-appeal-for-reconsideration-of-hatkanangale-ichalkaranji-new-line-project-on-socio-economic-grounds-despite-negative-ror-12.73-1-.pdf",
    referenceNo: ""
  },

  {
    id: 10,
    date: "2026-05-29",
    category: "letter",
    title: "पत्र — खासदार श्रीकांत शिंदे (शिवसेना)",
    to_whom: "खासदार धैर्यशील माने यांचे कार्यालय / शिवसेना केंद्रीय कार्यालय, प्रत मुख्यमंत्री देवेंद्र फडणवीस",
    description: "खासदारांच्या इचलकरंजी भेटीचे स्वागत, आणि रेल्वे मार्गासाठी जलद कार्यवाहीची विनंती — आधीच्या आश्वासनांवर ठोस कारवाई न झाल्याचे नमूद केले.",
    response: "अद्याप कोणतेही उत्तर मिळालेले नाही.",
    status: "no-response",
    referenceNo: "",
    en: {
      title: "Letter — MP Shrikant Shinde (Shivsena)",
      to_whom: "MP Dhairyashil Mane's office / Shivsena Central Office, cc CM Devendra Fadnavis",
      description: "Welcomed the MP's planned visit to Ichalkaranji, and requested fast-tracking action on the railway line — noting that earlier assurances had not translated into concrete action.",
      response: "No response received yet.",
    },
  },

  {
    id: 11,
    date: "2026-06-07",
    category: "letter",
    title: "तीव्र आक्षेप — शंकेश्वर–पारकनट्टी सर्वेक्षण; कराड–इचलकरंजी–निपाणी–बेळगाव मार्गासाठी विनंती",
    to_whom: "अध्यक्ष, रेल्वे बोर्ड; प्रत पंतप्रधान कार्यालय, रेल्वे मंत्री, मुख्यमंत्री महाराष्ट्र, महाव्यवस्थापक पुणे विभाग, खासदार/आमदार",
    description: "बेळगाव–कोल्हापूर मार्गासाठी इचलकरंजीला वगळणाऱ्या नवीन शंकेश्वर–पारकनट्टी सर्वेक्षणाला तीव्र आक्षेप. आधीच सर्वेक्षण झालेल्या कराड–इचलकरंजी–निपाणी–बेळगाव मार्गाला (१९१ किमी, ₹२,१०० कोटी) तात्काळ मंजुरी आणि हातकणंगले–इचलकरंजी ८ किमी विभाग त्याला जोडण्याची ५ विशिष्ट मागण्या.",
    response: "प्रिय अर्जदार,आपला ई-मेल या कार्यालयास प्राप्त झाला असून, सदर ई-मेल योग्य त्या कार्यवाहीसाठी परिवहन व बंदरे- गृह विभाग यांना, विमान चालन  (२२०२५००९, २२०२४२४३)  पाठविण्यात आला आहे. तरी आपल्या या ई-मेलबाबत यापुढे उपरोक्त विभागात चौकशी करण्यात यावी.मा. मुख्यमंत्री सचिवालय मंत्रालय, मुंबई",
    status: "",
    proofType: "pdf",
    proofSrc: "11-gmail-strong-objection-to-the-new-sankeshwar-parknatti-survey-for-belagavi-kolhapur-railway-line-and-urgent-request-for-approval-of-karad-ichalkaranji-nipani-belagavi-191-km-route-1-.pdf",
    referenceNo: ""
  },

  {
    id: 12,
    date: "2026-06-09",
    category: "letter",
    title: "पत्र — केंद्रीय गृहमंत्री अमित शाह",
    to_whom: "केंद्रीय गृहमंत्री अमित शाह",
    description: "२१ जूनच्या इचलकरंजी भेटीचे स्वागत, आणि रेल्वे कनेक्टिव्हिटीच्या वर्षानुवर्षे प्रलंबित मागणीकडे वैयक्तिक लक्ष देण्याची विनंती.",
    response: "अद्याप कोणतेही उत्तर मिळालेले नाही.",
    status: "no-response",
    referenceNo: "",
    en: {
      title: "Letter — Union Home Minister Amit Shah",
      to_whom: "Union Home Minister Amit Shah",
      description: "Welcomed the Union Home Minister's visit to Ichalkaranji on 21 June, and requested his personal attention to the decades-long pending demand for rail connectivity.",
      response: "No response received yet.",
    },
  },

  {
    id: 13,
    date: "2026-05-09",
    category: "letter",
    title: "तातडीचे — केंद्रीय वस्त्रोद्योग मंत्री गिरिराज सिंह",
    to_whom: "केंद्रीय वस्त्रोद्योग मंत्री गिरिराज सिंह, प्रत मुख्यमंत्री देवेंद्र फडणवीस",
    description: "इचलकरंजीच्या वस्त्रोद्योगासाठी रेल्वे कनेक्टिव्हिटी किती महत्त्वाची आहे — DPR खर्च ₹१८०.७३ कोटी, ROR −१२.७३%, आणि मे २०२६ पर्यंत भौतिक प्रगती शून्य, हा अधिकृत तपशील नमूद करून वैयक्तिक हस्तक्षेपाची विनंती.",
    response: "अद्याप कोणतेही उत्तर मिळालेले नाही.",
    status: "no-response",
    referenceNo: "",
    en: {
      title: "URGENT — Union Textile Minister Giriraj Singh",
      to_whom: "Union Minister of Textiles Giriraj Singh, cc CM Devendra Fadnavis",
      description: "Set out how crucial rail connectivity is for Ichalkaranji's textile industry, citing the official status — DPR cost ₹180.73 crore, ROR -12.73%, and zero physical progress as of May 2026 — and requested personal intervention.",
      response: "No response received yet.",
    },
  },

  {
    id: 14,
    date: "2026-05-09",
    category: "letter",
    title: "पत्र — राज्य वस्त्रोद्योग मंत्री संजय सावकारे",
    to_whom: "महाराष्ट्र वस्त्रोद्योग मंत्री संजय सावकारे, प्रत मुख्यमंत्री फडणवीस, जिल्हाधिकारी कोल्हापूर",
    description: "नकारात्मक ROR मुळे प्रकल्पाला 'विशेष औद्योगिक प्रकल्प' म्हणून मान्यता द्यावी, ROR सुधारण्यासाठी राज्य सरकारचा ५०% खर्चवाटा, आणि तातडीने भूसंपादन सुरू करण्याची मागणी.",
    response: "अद्याप कोणतेही उत्तर मिळालेले नाही.",
    status: "no-response",
    referenceNo: "",
    en: {
      title: "Letter — Maharashtra Textile Minister Sanjay Savkare",
      to_whom: "Maharashtra Textile Minister Sanjay Savkare, cc CM Fadnavis, Collector Kolhapur",
      description: "Demanded that the project be granted 'Special Industrial Project' status because of the negative ROR, 50% cost-sharing from the state government to improve the ROR, and urgent commencement of land acquisition.",
      response: "No response received yet.",
    },
  },

  {
    id: 15,
    date: "2026-04-06",
    category: "grievance",
    title: "सामूहिक अर्ज — जिल्हाधिकारी कोल्हापूर → महानगरपालिका → मध्य रेल्वे DEN",
    to_whom: "जिल्हाधिकारी कोल्हापूर → इचलकरंजी महानगरपालिका → विभागीय रेल्वे अभियंता, मध्य रेल्वे पुणे",
    description: "८ किमी मार्ग आणि आधुनिक रेल्वे स्थानकासाठी सामूहिक, आग्रही अर्ज. जिल्हाधिकारी कार्यालयाने १५.०४.२०२६ रोजी पुढे पाठवला; महानगरपालिकेने जून २०२६ मध्ये मध्य रेल्वे DEN कडे पुढे पाठवला.",
    response: "अर्ज साखळीतून पुढे पाठवला गेला — प्रत्येक टप्प्यावर 'योग्य ती कार्यवाही करावी' असे निर्देश दिले गेले. अद्याप ठोस उत्तर नाही.",
    status: "pending",
    referenceNo: "I-७१९५०८ / कार्या.११/नपा/आरआर/संक-१/७८/२६",
    en: {
      title: "Joint Application — Collector Kolhapur → Municipal Corporation → Central Railway DEN",
      to_whom: "Collector Kolhapur → Ichalkaranji Municipal Corporation → Divisional Railway Engineer, Central Railway Pune",
      description: "A collective, urgent application for the 8 km line and a modern railway station. The Collector's office forwarded it on 15.04.2026; the Municipal Corporation forwarded it to the Central Railway DEN in June 2026.",
      response: "The application was forwarded through the chain — at every stage the instruction given was 'take appropriate action.' No substantive reply yet.",
    },
  },

  {
    id: 16,
    date: "2017-06-11",
    category: "media",
    title: "ऐतिहासिक: हातकणंगले–इचलकरंजी सर्वेक्षणासाठी भूमिपूजन",
    to_whom: "सार्वजनिक नोंद — मध्य रेल्वेचा अधिकृत कार्यक्रम",
    description: "कराड येथे झालेल्या कार्यक्रमात, तत्कालीन रेल्वे मंत्री सुरेश प्रभू यांच्या हस्ते, हातकणंगले–इचलकरंजी नवीन मार्गाच्या अंतिम स्थान सर्वेक्षणाचे भूमिपूजन झाले — वैभववाडी–कोल्हापूर मार्ग व इतर प्रकल्पांसह. मध्य रेल्वेच्या अधिकृत ट्विटर खात्यावरही ही घोषणा झाली होती. हा दस्तऐवज २०२४-२५ च्या पिंक बुक अर्थसंकल्प तक्त्यासह एकाच फाईलमध्ये आहे, ज्यात क्रमांक १२ अंतर्गत हातकणंगले–इचलकरंजी ८ किमीसाठी २०२४-२५ करिता ₹१,६०,००,००० भांडवली तरतूद दाखवली आहे — 'योग्य प्रक्रिया/अनिवार्य मंजुऱ्यांनंतरच खर्च होईल' अशी त्यावर नोंद आहे.",
    response: "२०१७ साली सर्वेक्षणाचे भूमिपूजन झाले, पण अद्याप प्रकल्प मंजूर झालेला नाही.",
    status: "replied",
    referenceNo: "",
    en: {
      title: "Historical: Foundation Stone Laid for Hatkanangale-Ichalkaranji Survey",
      to_whom: "Public record — Central Railway official event",
      description: "At an event in Karad, then Railway Minister Suresh Prabhu laid the foundation stone for the Final Location Survey of the Hatkanangale–Ichalkaranji New Line, alongside the Vaibhavwadi–Kolhapur line and other projects. Central Railway's official Twitter account also announced this. This document sits together with the 2024–25 Pink Book budget table, which shows a ₹1,60,00,000 capital outlay for 2024–25 against item #12, Hatkanangale–Ichalkaranji 8 km — with a note that spending will occur 'only after due processes/mandatory approvals'.",
      response: "The survey's foundation stone was laid in 2017, but the project remains unsanctioned to date.",
    },
  },

  {
    id: 17,
    date: "2022-11-30",
    category: "media",
    title: "बातमी — दैनिक केसरी: \"रेल्वे कृती समिती प्रयत्नशील\"",
    to_whom: "सार्वजनिक वृत्तांकन — दैनिक केसरी, इचलकरंजी आवृत्ती",
    description: "इचलकरंजी रेल्वे कृती समिती गेल्या १९-२० वर्षांपासून सातत्यपूर्ण प्रयत्न करत आहे यावर स्थानिक नागरिक, मागासवर्ग कार्यकर्ते, आणि व्यापारी संघटनांच्या प्रतिक्रिया असलेले विशेष वृत्तांकन.",
    response: "मोहिमेच्या दीर्घकालीन प्रयत्नाचे प्रसारमाध्यम वृत्तांकन.",
    status: "replied",
    referenceNo: "",
    en: {
      title: "News — Dainik Kesari: \"Railway Action Committee Keeps Trying\"",
      to_whom: "Public coverage — Dainik Kesari, Ichalkaranji edition",
      description: "Special coverage on the Ichalkaranji Railway Action Committee's continuous 19–20-year effort, featuring reactions from local citizens, backward-class activists, and trade associations.",
      response: "N/A — press coverage of the campaign's long-running effort.",
    },
  },

  {
    id: 18,
    date: "2026-05-12",
    category: "media",
    title: "बातमी — दैनिक पुढारी: \"सर्वेक्षणानंतरही मार्ग रखडलेलाच\"",
    to_whom: "सार्वजनिक वृत्तांकन — दैनिक पुढारी, माय कोल्हापूर आवृत्ती",
    description: "सर्वेक्षण पूर्ण झाले असतानाही हातकणंगले–इचलकरंजी रेल्वे मार्ग रखडलेला आहे यावर वृत्तांकन. माजी रेल्वे मंत्री सुरेश प्रभू यांच्या २०१७ च्या मंजुरीचा उल्लेख, आणि निधीची टोकन रक्कम राखीव ठेवली गेली आहे पण भूसंपादन सुरू झालेले नाही असे नमूद.",
    response: "प्रसारमाध्यम वृत्तांकन.",
    status: "replied",
    referenceNo: "",
    en: {
      title: "News — Dainik Pudhari: \"Route Still Stalled Even After the Survey\"",
      to_whom: "Public coverage — Dainik Pudhari, My Kolhapur Edition",
      description: "Coverage on how the Hatkanangale–Ichalkaranji rail route remains stalled despite the survey being completed. Mentions former Railway Minister Suresh Prabhu's 2017 approval, and notes that only a token amount of funds has been reserved while land acquisition has not started.",
      response: "N/A — press coverage.",
    },
  },

  {
    id: 19,
    date: "2026-04-16",
    category: "letter",
    title: "बातमी — मास लेटर मोहीम: राज्य सरकारला \"भावनिक साद\"",
    to_whom: "पंतप्रधान, मुख्यमंत्री, राज्य/केंद्रीय मंत्री, खासदार, आमदार — मोठ्या प्रमाणावरील पोस्टकार्ड मोहिमेद्वारे",
    description: "रेल्वे कृती समितीने २०११ साली नवीन पाठपुरावा मोहीम सुरू केली होती, त्या मोहिमेचा भाग म्हणून हातकणंगले–इचलकरंजीसाठी १०,००० पत्रे मुख्यमंत्री आणि पंतप्रधानांकडे पाठवण्यात आली — केसरी वृत्तपत्राचे वृत्तांकन.",
    response: "मास लेटर मोहिमेचे प्रसारमाध्यम वृत्तांकन.",
    status: "",
    referenceNo: ""
  },

  {
    id: 20,
    date: "2026-02-26",
    category: "media",
    title: "बातमी — दैनिक केसरी: धरणे आंदोलनाला पाठिंबा",
    to_whom: "सार्वजनिक वृत्तांकन — दैनिक केसरी",
    description: "इचलकरंजी रेल्वे कृती समितीने जिल्हाधिकारी कार्यालयासमोर एकदिवसीय धरणे आंदोलन केले. विविध सामाजिक, राजकीय, सहकारी संस्था आणि रेल्वेप्रेमी नागरिकांच्या उत्स्फूर्त प्रतिसादाने मोठ्या प्रमाणावर उपस्थिती लावली. लोकप्रतिनिधींकडून अपेक्षित प्रतिसाद न मिळाल्याने समितीने शासन पातळीवर सातत्याने पाठपुरावा करण्याचे जाहीर केले.",
    response: "आंदोलनानंतर राजकीय पुढाऱ्यांनी सक्रिय सहकार्याचे आश्वासन दिले, पण वर्षानुवर्षे राजकीय उदासीनता आणि निधीअभावी हातकणंगले–इचलकरंजी प्रकल्प प्रलंबित आहे.",
    status: "no-response",
    referenceNo: "",
    en: {
      title: "News — Dainik Kesari: Sit-in Protest Support",
      to_whom: "Public coverage — Dainik Kesari",
      description: "The Ichalkaranji Railway Action Committee held a one-day sit-in protest outside the Collector's office. Various social, political, and cooperative organisations, along with railway-supporting citizens, showed spontaneous, large-scale participation. As the expected response from elected representatives did not come, the committee announced it would keep up follow-up at the government level.",
      response: "After the protest, political leaders assured active cooperation, but the Hatkanangale–Ichalkaranji project remains pending, year after year, due to political apathy and lack of funds.",
    },
  },

  {
    id: 21,
    date: "2026-04-01",
    category: "letter",
    title: "महापौरांना निवेदन — इचलकरंजी महानगरपालिका",
    to_whom: "महापौर, इचलकरंजी महानगरपालिका",
    description: "रेल्वे कृती समितीने महापौरांना निवेदन दिले — खासदार, आमदार, आणि पालकमंत्री यांच्यासोबत विशेष बैठक बोलावण्याची, तसेच मालमत्ता/GST संबंधी प्रश्न सोडवण्याची मागणी. सुरेश प्रभू यांच्या २०१७ च्या मंजुरीचा उल्लेख केला.",
    response: "महापौरांनी निवेदन स्वीकारले, औपचारिक पाठपुरावा अद्याप प्रलंबित.",
    status: "pending",
    referenceNo: "",
    en: {
      title: "Memorandum to Mayor — Ichalkaranji Municipal Corporation",
      to_whom: "Mayor, Ichalkaranji Municipal Corporation",
      description: "The Railway Action Committee submitted a memorandum to the Mayor, requesting a special meeting with the MP, MLA, and Guardian Minister, and asking for property/GST-related issues to be resolved. Mentioned former Railway Minister Suresh Prabhu's 2017 approval.",
      response: "The Mayor accepted the memorandum; formal follow-up is still pending.",
    },
  },

  {
    id: 22,
    date: "2026-04-12",
    category: "media",
    title: "बातमी — नागरिक प्रतिक्रिया विशेष पुरवणी",
    to_whom: "सार्वजनिक वृत्तांकन — रेल्वे विषयावरील विशेष पुरवणी",
    description: "इचलकरंजी शहरातील ३०+ प्रतिष्ठित नागरिकांच्या (व्यापारी संघटना अध्यक्ष, डॉक्टर, वकील, शिक्षक, माजी नगरसेवक) रेल्वे मार्गाबाबतच्या वैयक्तिक प्रतिक्रिया असलेली विशेष पुरवणी — रोजगार, व्यापार, महिला सुरक्षा, उद्योग वाढ, अशा अनेक अंगांनी मते.",
    response: "समुदायाचे मत नोंदवणारे प्रसारमाध्यम वृत्तांकन.",
    status: "replied",
    referenceNo: "",
    en: {
      title: "News — Citizen Testimonials Special Supplement",
      to_whom: "Public coverage — special railway-issue supplement",
      description: "A special supplement featuring personal reactions to the railway line from 30+ prominent citizens of Ichalkaranji (business association presidents, doctors, lawyers, teachers, former corporators) — covering angles like employment, trade, women's safety, and industrial growth.",
      response: "N/A — press coverage collecting community voices.",
    },
  },

  {
    id: 23,
    date: "2026-05-09",
    category: "media",
    title: "बातमी — राष्ट्रगीत: खासदार माने यांचे निधी आश्वासन",
    to_whom: "सार्वजनिक वृत्तांकन — दैनिक राष्ट्रगीत",
    description: "खासदार धैर्यशील माने यांनी रेल्वे कृती समितीच्या बैठकीत आश्वासन दिले की दीड महिन्यात निधी उपलब्ध होईल — दिवाळीपूर्वी राज्य सरकारचे १०० कोटी व केंद्र सरकारचे १०० कोटी असे जवळपास २०० कोटी उपलब्ध करून देऊ, असे सांगितले. या आश्वासनानंतर समितीने धरणे आंदोलन तात्पुरते स्थगित केले.",
    response: "आश्वासन दिले गेले, पण अद्याप प्रत्यक्ष निधी वितरण झालेले नाही.",
    status: "pending",
    referenceNo: "",
    en: {
      title: "News — Rashtragee: MP Mane's Funding Assurance",
      to_whom: "Public coverage — Dainik Rashtragee",
      description: "MP Dhairyashil Mane assured the Railway Action Committee at a meeting that funds would be available within a month and a half — around ₹200 crore before Diwali, split as ₹100 crore from the state government and ₹100 crore from the central government. Following this assurance, the committee temporarily suspended its sit-in protest.",
      response: "The assurance was given, but actual fund disbursement has not happened yet.",
    },
  },

  {
    id: 24,
    date: "2026-04-12",
    category: "letter",
    title: "मोठ्या प्रमाणावरील पोस्टकार्ड मोहीम — छायाचित्र पुरावा",
    to_whom: "पंतप्रधान, मुख्यमंत्री, राज्य/केंद्रीय मंत्री — मोठ्या प्रमाणावरील पोस्टकार्ड मोहिमेद्वारे",
    description: "हजारो पोस्टकार्ड्स बांधून प्रेस रूममध्ये काढलेले छायाचित्र — मास लेटर मोहिमेचा भौतिक पुरावा, केसरीच्या '१०,००० पत्रे' वृत्तांकनाशी संबंधित (१६ एप्रिल २०२६ ची नोंद).",
    response: "मास मेलिंग मोहिमेचा भौतिक पुरावा.",
    status: "no-response",
    referenceNo: "",
    en: {
      title: "Mass Postcard Campaign — Photo Evidence",
      to_whom: "PM, CM, State/Central Ministers — via bulk postcard mailing",
      description: "Thousands of postcards bundled together, photographed in the press room — physical evidence of the mass letter-writing campaign, related to Kesari's '10,000 letters' coverage (entry dated 16 April 2026).",
      response: "N/A — physical evidence of the mass mailing campaign.",
    },
  },

  {
    id: 25,
    date: "2024-05-06",
    category: "media",
    title: "बातमी — राष्ट्रगीत: भाजप रेल्वे सेल संयोजक कैलास वर्मा यांचे दिल्ली बैठकीचे आश्वासन",
    to_whom: "सार्वजनिक वृत्तांकन — दैनिक राष्ट्रगीत",
    description: "भाजप महाराष्ट्र रेल्वे समितीचे प्रदेश प्रकोष्ठ संयोजक कैलास वर्मा यांनी इचलकरंजीला भेट देऊन कृती समितीला आश्वासन दिले की लोकसभा आचारसंहिता संपल्यानंतर केंद्रीय रेल्वे विभाग, नीती आयोग तसेच मुंबईत उपमुख्यमंत्री देवेंद्र फडणवीस यांच्यासोबत बैठक लावली जाईल.",
    response: "२०२४ च्या लोकसभा निवडणुकीपूर्वी दिलेल्या राजकीय आश्वासनाचे वृत्तांकन.",
    status: "replied",
    referenceNo: "",
    en: {
      title: "News — Rashtragee: BJP Railway Cell Convener Kailash Verma's Delhi Meeting Promise",
      to_whom: "Public coverage — Dainik Rashtragee",
      description: "Kailash Verma, convener of the BJP Maharashtra Railway Cell's state wing, visited Ichalkaranji and assured the Railway Action Committee that once the Lok Sabha model code of conduct ended, a meeting would be arranged with the central Railway Ministry, NITI Aayog, and Deputy CM Devendra Fadnavis in Mumbai.",
      response: "N/A — press coverage of a political assurance given before the 2024 Lok Sabha elections.",
    },
  },

  {
    id: 26,
    date: "2024-05-04",
    category: "media",
    title: "बातमी — पुढारी: \"रेल्वे प्रश्न ऐरणीवर\" (२०२४ निवडणूक वृत्तांकन)",
    to_whom: "सार्वजनिक वृत्तांकन — दैनिक पुढारी, माय कोल्हापूर आवृत्ती",
    description: "लोकसभा निवडणुकीत इचलकरंजी रेल्वे प्रश्नावर उमेदवारांची दुटप्पी भूमिका उघड झाली — एकाने रेल्वेसाठी पत्र दिले होते, पण काही दिवसांनी १४ गावांच्या विरोधानंतर रेल्वे नकोच म्हणून सांगितले. कृती समितीने सर्व उमेदवारांना रेल्वे प्रश्नावर भूमिका स्पष्ट करण्याचे आवाहन केले.",
    response: "२०२४ निवडणूक काळातील वृत्तांकन.",
    status: "replied",
    referenceNo: "",
    en: {
      title: "News — Pudhari: \"Railway Issue Takes Centre Stage\" (2024 Election Coverage)",
      to_whom: "Public coverage — Dainik Pudhari, My Kolhapur Edition",
      description: "During the Lok Sabha election, candidates showed a contradictory stance on the Ichalkaranji railway issue — one had written a letter supporting the railway, but a few days later said the railway wasn't needed, after opposition from 14 villages. The Committee called on all candidates to clarify their position on the railway issue.",
      response: "N/A — press coverage during 2024 election cycle.",
    },
  },

  {
    id: 27,
    date: "2026-05-12",
    category: "media",
    title: "बातमी — राष्ट्रगीत: सुरेश प्रभूंची विलंबाबाबत नाराजी",
    to_whom: "सार्वजनिक वृत्तांकन — दैनिक राष्ट्रगीत",
    description: "माजी केंद्रीय रेल्वे मंत्री सुरेश प्रभू इचलकरंजीच्या आपटे वाचन मंदिरात व्याख्यानासाठी आले असता, कृती समितीने त्यांच्या हस्ते २०१७ साली मंजुरी दिल्याबद्दल जाहीर सत्कार केला. प्रभूंनी मार्ग मंजूर होऊन सर्वेक्षण पूर्ण झाल्यानंतरही ८ किमीचा मार्ग रखडल्याबद्दल नाराजी व्यक्त केली आणि वस्त्रनगरी रेल्वे मार्गावर येणे गरजेचे आहे असे आवर्जून सांगितले.",
    response: "माजी रेल्वे मंत्र्यांच्या सार्वजनिक विधानाचे वृत्तांकन.",
    status: "no-response",
    referenceNo: "",
    en: {
      title: "News — Rashtragee: Suresh Prabhu's Displeasure Over Delay",
      to_whom: "Public coverage — Dainik Rashtragee",
      description: "Former Union Railway Minister Suresh Prabhu came to Ichalkaranji for a lecture at Apte Vachan Mandir; the Railway Action Committee publicly felicitated him for granting approval in 2017. Prabhu expressed displeasure that the 8 km line remained stalled even after the survey was fully completed, and stressed that it was essential for the textile city to get onto the railway map.",
      response: "N/A — press coverage of former Railway Minister's public statement.",
    },
  },

  {
    id: 28,
    date: "2026-06-21",
    category: "letter",
    title: "प्रत्यक्ष भेट — केंद्रीय गृहमंत्री अमित शाह यांना निवेदन सुपूर्द",
    to_whom: "केंद्रीय गृहमंत्री अमित शाह",
    description: "इचलकरंजी भेटीदरम्यान, कृती समितीच्या प्रतिनिधींनी प्रत्यक्ष भेटून अमित शाह यांना रेल्वे मागणीचे निवेदन सुपूर्द केले — ९ जूनच्या ईमेलमध्ये उल्लेख केलेल्या भेटीचा हा प्रत्यक्ष पुरावा.",
    response: "निवेदन स्वीकारले गेले; औपचारिक लेखी उत्तर अद्याप आलेले नाही.",
    status: "pending",
    proofType: "image",
    proofSrc: "amit-shah-ichalkaranji-railway-nivedan.jpg.jpeg",
    referenceNo: ""
  },

  {
    id: 29,
    date: "2026-04-01",
    category: "letter",
    title: "लोकसभा — खासदार धैर्यशील माने यांनी इचलकरंजी रेल्वे प्रश्न उपस्थित केला",
    to_whom: "लोकसभा / रेल्वे मंत्रालय (संसदेच्या सभागृहात मांडले)",
    description: "खासदार धैर्यशील माने यांनी लोकसभेत इचलकरंजीचा रखडलेला रेल्वे प्रश्न उपस्थित केला — वर्षानुवर्षे प्रलंबित असलेल्या ८ किमी मार्गाबाबत चिंता व्यक्त केली. (नेमकी अधिवेशन तारीख निश्चित नाही, फाईल २ एप्रिल २०२६ रोजी शेअर झाली.)",
    response: "संसदीय प्रतिनिधित्वाची अधिकृत नोंद.",
    status: "no-response",
    proofType: "video",
    proofSrc: "29-vid-20260402-wa0002.mp4",
    referenceNo: ""
  },

  {
    id: 30,
    date: "2025-03-17",
    category: "letter",
    title: "लोकसभा अधिवेशन (१७ मार्च २०२५) — कोल्हापूर-इचलकरंजी व कोल्हापूर-वैभववाडी मार्ग",
    to_whom: "लोकसभा / रेल्वे मंत्रालय (संसदेच्या सभागृहात मांडले)",
    description: "१७ मार्च २०२५ च्या लोकसभा अधिवेशनात एका खासदारांनी कोल्हापूर-इचलकरंजी आणि कोल्हापूर-वैभववाडी या दोन्ही रेल्वे मार्गांसाठी ठाम आवाज उठवला.",
    response: "संसदीय प्रतिनिधित्वाची अधिकृत नोंद.",
    status: "no-response",
    proofType: "video",
    proofSrc: "30-vid-20260402-wa0004.mp4",
    referenceNo: "",
    en: {
      title: "Lok Sabha Session (17 March 2025) — Kolhapur-Ichalkaranji & Kolhapur-Vaibhavwadi Lines",
      to_whom: "Lok Sabha / Ministry of Railways (raised on the floor of Parliament)",
      description: "In the Lok Sabha session of 17 March 2025, an MP strongly raised his voice for both the Kolhapur–Ichalkaranji and Kolhapur–Vaibhavwadi railway routes.",
      response: "N/A — parliamentary representation on record.",
    },
  },

  {
    id: 31,
    date: "2024-11-08",
    category: "letter",
    title: "निवडणूक प्रचारसभा — केंद्रीय गृहमंत्री अमित शाह यांना निवेदन सुपूर्द",
    to_whom: "केंद्रीय गृहमंत्री अमित शाह (महाराष्ट्र विधानसभा निवडणूक प्रचार दौऱ्यादरम्यान)",
    description: "२०२४ च्या महाराष्ट्र विधानसभा निवडणुकीच्या प्रचारसभेत, रेल्वे कृती समितीच्या वतीने श्री. बाळकृष्ण तोतला जी यांनी अमित शाह यांना रेल्वे मागणीचे निवेदन दिले.",
    response: "निवेदन स्वीकारले गेले; औपचारिक उत्तर आलेले नाही.",
    status: "no-response",
    proofType: "video",
    proofSrc: "31-vid-20260608-wa0035.mp4",
    referenceNo: ""
  },

  {
    id: 32,
    date: "2026-07-29",
    category: "rti",
    title: "RTI उत्तर — निधी मंजुरी व DPR स्थिती (Ref. OL-272)",
    to_whom: "मुख्य प्रशासकीय अधिकारी (निर्माण), मध्य रेल्वे, मुंबई",
    description: "हातकणंगले–इचलकरंजी (8 किमी) प्रकल्पासाठी 2017 पासून वर्षनिहाय किती निधी मंजूर झाला (प्रमाणित प्रतीसह), राज्य सरकारचा 50% वाटा रेल्वेकडे वर्ग झाला का, आणि DPR मंजूर झाला आहे का व भौतिक काम कोणत्या टप्प्यावर आहे — असे 3 प्रश्न विचारले.",
    response: "प्रकल्प 2017-18 च्या Pink Book मध्ये समाविष्ट; 2017 ते 2026 या काळात एकूण ₹12.2005 कोटी निधी मंजूर (आवश्यक प्रक्रिया/मंजुऱ्यांनंतरच प्रत्यक्ष खर्च होईल असे नमूद). प्रकल्प राज्य सरकार–रेल्वे यांच्यातील cost-sharing व्यवस्थेवर आधारित नाही. DPR 02.01.2020 रोजी ₹180.73 कोटी खर्चासह सादर, ROR (-12.73%), सध्या रेल्वे बोर्डाच्या छाननीत.",
    status: "replied",
    referenceNo: "EW/106/RTI/2026/OL-272 (RTI Appl. No. CRAIL/R/P/26/00177)",
    en: {
      title: "RTI Reply — Fund Sanction & DPR Status (Ref. OL-272)",
      to_whom: "Chief Administrative Officer (Const.), Central Railway, Mumbai",
      description: "Asked 3 questions: year-wise funds sanctioned for the Hatkanangale–Ichalkaranji (8 km) project since 2017 with certified proof, how much of the state government's 50% share has been transferred to the railway, and whether the DPR has been sanctioned and at what physical-work stage the project stands.",
      response: "The project featured in the 2017-18 Pink Book; total funds allocated for 2017–2026 are ₹12.2005 crore (expenditure to occur only after due processes/approvals). The project is not based on a cost-sharing arrangement between the state government and the railway. The DPR was submitted on 02.01.2020 at a cost of ₹180.73 crore, ROR (-12.73%), currently under scrutiny of the Railway Board.",
    },
  },

  {
    id: 33,
    date: "2026-07-29",
    category: "rti",
    title: "RTI उत्तर — Traffic Survey, फाईल नोटिंग्ज व निधी तपशील (Ref. OL-270)",
    to_whom: "मुख्य प्रशासकीय अधिकारी (निर्माण), मध्य रेल्वे, मुंबई",
    description: "ROR -12.73% कशी निश्चित झाली याचा Traffic Survey Report व Financial Appraisal Note, 2020-2026 दरम्यानच्या रेल्वे बोर्डाच्या फाईल नोटिंग्ज, प्रकल्प छाननीसाठीची कमाल वेळ-मर्यादा, राज्य सरकार–रेल्वे यांच्यातील cost-sharing पत्रव्यवहार, आणि 2017 पासूनच्या मंजूर/व्यपगत निधीचा वर्षनिहाय तपशील — असे 5 सविस्तर प्रश्न विचारले.",
    response: "DPR 02.01.2020 रोजी ₹180.73 कोटी व ROR (-12.73%) सह सादर; अद्याप मंजूर न झाल्याने Traffic Survey/Financial Appraisal तपशील देता येणार नाही. फाईल नोटिंग्ज 'या कार्यालयात उपलब्ध नाहीत' असे उत्तर. छाननीसाठी रेल्वे बोर्डाने कुठलीही कालमर्यादा ठरवलेली नाही. प्रकल्प cost-sharing व्यवस्थेवर आधारित नाही. 2017 ते 2026 या काळात एकूण ₹12.2005 कोटी निधी मंजूर, आवश्यक मंजुऱ्यांनंतरच खर्च होईल.",
    status: "replied",
    referenceNo: "EW/106/RTI/2026/OL-270 (RTI Appl. No. CRAIL/R/P/26/00176)",
    en: {
      title: "RTI Reply — Traffic Survey, File Notings & Fund Details (Ref. OL-270)",
      to_whom: "Chief Administrative Officer (Const.), Central Railway, Mumbai",
      description: "Asked 5 detailed questions: the Traffic Survey Report and Financial Appraisal Note behind the -12.73% ROR figure, Railway Board file notings/green sheets from 2020-2026, the maximum time limit allowed for project scrutiny, correspondence on the state government's cost-sharing with the railway, and a year-wise breakdown of funds sanctioned/lapsed since 2017.",
      response: "The DPR was submitted on 02.01.2020 at ₹180.73 crore with ROR (-12.73%); as it is not yet sanctioned, Traffic Survey/Financial Appraisal details cannot be shared. File notings were stated to be 'not available in this office.' The Railway Board has given no timeline for scrutiny. The project is not based on a cost-sharing arrangement. Total funds allocated for 2017–2026 are ₹12.2005 crore, to be spent only after due approvals.",
    },
  },

  {
    id: 34,
    date: "2026-08-06",
    category: "social",
    title: "इचलकरंजी रेल्वे कृती समिती",
    to_whom: "Central Railway",
    description: "इचलकरंजी करांची रेल्वे मागणी लवकरात लवकर पूर्ण करावी.",
    response: "नक्कीच",
    status: "replied",
    proofType: "image",
    proofSrc: "34--5q6s48.jpg",
    referenceNo: ""
  },

];


/* Category labels shown in the UI — don't need to edit this */
const CATEGORY_META = {
  rti:        { label: "RTI",              short: "RTI" },
  grievance:  { label: "Grievance Portals", short: "Grievance" },
  petition:   { label: "Petitions",         short: "Petition" },
  letter:     { label: "Letters to Officials", short: "Letter" },
  social:     { label: "Social Media",      short: "Social" },
  media:      { label: "Press / Media",     short: "Media" },
};
