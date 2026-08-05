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
  id: 1,
  date: "2026-05-15",
  category: "movement",
  title: "केंद्रीय गृहमंत्री अमित शाह यांना निवेदन",
  to_whom: "गृह मंत्रालय, भारत सरकार",
  description: "रेल्वे कृती समितीच्या शिष्टमंडळाने थेट केंद्रीय गृहमंत्री अमित शाह �[...]",
  response: "सर्वोच्च पातळीवर पाठपुरावा",
  proofSrc: "amit-shah-ichalkaranji-railway-nivedan.jpg.jpeg",
  en: {
    title: "Memorandum Submited to HM Amit Shah",
    to_whom: "Ministry of Home Affairs, GoI",
    description: "Kruti Samiti delegation met Union Home Minister Amit Shah directly to request immediate clearance for the railway track.",
    response: "Highest Advocacy"
  }
},
{
  id: 2,
  date: "1965-11-20",
  category: "government",
  title: "नगरपालिकेचा १९६५ चा ऐतिहासिक ठराव",
  to_whom: "रेल्वे मंत्रालय",
  description: "६० वर्षांपूर्वी इचलकरंजी नगरपालिकेने मिरज-कोल्हापूर रेल्वे लाईन ब्��[...]",
  response: "ऐतिहासिक पाऊलखूण",
  proofSrc: "ichalkaranji-railway-historical-1965-resolution.jpg.jpeg",
  en: {
    title: "Historical 1965 Municipal Resolution",
    to_whom: "Ministry of Railways",
    description: "The historic resolution passed by Ichalkaranji Municipality in 1965 demanding a connection during Miraj-Kolhapur gauge conversion.",
    response: "Historical Milestone"
  }
},
{
  id: 3,
  date: "2026-05-12",
  category: "news",
  title: "सर्व्हेनंतरही रेल्वे मार्ग रखडलाच पुढारी बातमी",
  to_whom: "प्रशासन व नागरिक",
  description: "माजी केंद्रीय रेल्वेमंत्री सुरेश प्रभू यांनी सर्व्हे होऊनही हातकणं��[...]",
  response: "प्रकल्प प्रलंबित खंत",
  proofSrc: "pudhari-suresh-prabhu-railway-statement-2026.jpg.jpeg",
  en: {
    title: "Route Delayed Despite Survey: Pudhari News",
    to_whom: "Administration & Public",
    description: "Former Railway Minister Suresh Prabhu expressed deep concern over the stagnation of the project after completion of the survey.",
    response: "Delay Concerns"
  }
},
{
  id: 4,
  date: "2026-05-11",
  category: "news",
  title: "माजी रेल्वेमंत्र्यांची नाराजी राष्ट्रगीत बातमी",
  to_whom: "कृती समिती व नागरिक",
  description: "इचलकरंजी दौऱ्यावर आले असता माजी रेल्वेमंत्री सुरेश प्रभू यांनी प्रक�[...]",
  response: "जाहीर सत्कार व निवेदन",
  proofSrc: "suresh-prabhu-ichalkaranji-satkar-news.jpg.jpeg",
  en: {
    title: "Former Minister's Disappointment: Rashtrageet News",
    to_whom: "Committee & Citizens",
    description: "During his visit to Ichalkaranji, former minister Suresh Prabhu expressed open dissatisfaction with the zero progress.",
    response: "Felicitation & Memo"
  }
},
{
  id: 5,
  date: "2026-04-10",
  category: "government",
  title: "मध्य रेल्वे आरटीआई (RTI) उत्तर २०२६",
  to_whom: "इचलकरंजी रेल्वे कृती समिती",
  description: "मध्य रेल्वेच्या उप मुख्य अभियंता कार्यालयाने आरटीआय अंतर्गत दिलेल्��[...]",
  response: "अधिकृत माहिती उघड",
  proofSrc: "central-railway-rti-reply-2026.jpg.jpeg",
  en: {
    title: "Central Railway RTI Reply 2026",
    to_whom: "Railway Kruti Samiti",
    description: "Central Railway Dy. Chief Engineer office clarified via RTI that the final approval from the Railway Board is still pending.",
    response: "Official Info Disclosed"
  }
},
{
  id: 6,
  date: "2024-05-06",
  category: "news",
  title: "दिल्ली बैठक आश्वासन राष्ट्रगीत बातमी",
  to_whom: "कृती समिती शिष्टमंडळ",
  description: "भाजप रेल्वे समितीचे प्रदेश संयोजक कैलाश वर्मा यांनी आचारसंहितेनंतर �[...]",
  response: "विशेष बैठक आश्वासन",
  proofSrc: "ichalkaranji-railway-delhi-baithak-news.jpg.jpeg",
  en: {
    title: "Delhi Meeting Assurance: Rashtrageet News",
    to_whom: "Committee Delegation",
    description: "BJP Railway Committee State Coordinator Kailash Verma assured a special meeting in Delhi and Mumbai after election code.",
    response: "Meeting Assured"
  }
},
{
  id: 7,
  date: "2024-05-04",
  category: "news",
  title: "रेल्वे प्रश्न ऐरणीवर पुढारी विश्लेषण",
  to_whom: "लोकप्रतिनिधी व प्रशासन",
  description: "निवडणूक काळात इचलकरंजीचा रखडलेला रेल्वे मार्ग आणि लोकप्रतिनिधींच्य[...]", 
  response: "माध्यम कव्हरेज",
  proofSrc: "pudhari-news-ichalkaranji-railway-issue.jpg.jpeg",
  en: {
    title: "Railway Issue at Forefront: Pudhari Analysis",
    to_whom: "Representatives & Admin",
    description: "Special analysis by Pudhari newspaper highlighting how the stalled railway route became a core issue during elections.",
    response: "Media Coverage"
  }
},
{
  id: 8,
  date: "2024-02-26",
  category: "movement",
  title: "रेल्वे धरणे आंदोलन केसरी वृत्तपत्र बातमी",
  to_whom: "प्रांत कार्यालय",
  description: "रेल्वे कृती समितीने प्रांत कार्यालयासमोर पुकारलेल्या एक दिवसीय धरण��[...]",
  response: "आंदोलन यशस्वी",
  proofSrc: "ichalkaranji-railway-dharna-andolan-news.jpg.jpeg",
  en: {
    title: "Dharna Protest Success: Kesari News",
    to_whom: "Prant Office",
    description: "Wide public and institutional support for the one-day Dharna protest organized by Kruti Samiti outside Prant Office.",
    response: "Protest Recorded"
  }
},
{
  id: 9,
  date: "2022-11-30",
  category: "news",
  title: "केसरी वृत्तपत्र विशेष पान २०२२",
  to_whom: "सार्वजनिक वाचक",
  description: "इचलकरंजीच्या वस्त्रोद्योगासाठी आणि कामगारांसाठी रेल्वे किती आवश्य�[...]",
  response: "विशेष आवृत्ती प्रसिद्ध",
  proofSrc: "kesari-special-page-ichalkaranji-railway.jpg.jpeg",
  en: {
    title: "Dainik Kesari Special Page 2022",
    to_whom: "General Public",
    description: "Comprehensive coverage featuring opinions from industrialists, doctors, and politicians urging for railway connectivity.",
    response: "Special Issue Released"
  }
},
{
  id: 10,
  date: "2017-06-11",
  category: "government",
  title: "रेल्वे सर्वेक्षण भूमिपूजन निमंत्रण पत्रिका २०१७",
  to_whom: "सर्व नागरिक व रेल्वेप्रेमी",
  description: "हातकणंगले-इचलकरंजी नवीन ब्रॉडगेज रेल्वे मार्गाच्या अंतिम स्थान निश��[...]",
  response: "पायाभरणी संपन्न",
  proofSrc: "hatkanangale-ichalkaranji-railway-survey-2017.jpg.jpeg",
  en: {
    title: "Railway Survey Bhumi Pujan Card 2017",
    to_whom: "All Citizens",
    description: "Official invitation card for the Foundation Stone Laying ceremony of Final Location Survey of HTK-ICH route.",
    response: "Ceremony Completed"
  }
},
{
  id: 11,
  date: "2017-06-11",
  category: "government",
  title: "मध्य रेल्वे अधिकृत ट्विट २०१७",
  to_whom: "डिजिटल पब्लिक",
  description: "मध्य रेल्वेच्या (Central Railway) अधिकृत ट्विटर हँडलवरून भूमिपूजन सोहळा आणि नव��[...]",
  response: "अधिकृत डिजिटल नोंद",
  proofSrc: "central-railway-bhumi-pujan-tweet.jpg.jpeg",
  en: {
    title: "Central Railway Official Tweet 2017",
    to_whom: "Digital Public",
    description: "Official tweet from Central Railway showcasing the updates and news clippings of the foundation stone laying ceremony.",
    response: "Digitally Documented"
  }
},
{
  id: 12,
  date: "2026-05-10",
  category: "movement",
  title: "इचलकरंजी रेल्वे जनआंदोलन मुख्य बॅनर",
  to_whom: "प्रशासन व सर्व नागरिक",
  description: "कृती समितीच्या 'आमच्यावरच अन्याय का? इचलकरंजीला रेल्वे कधी मिळणार?' या[...]",
  response: "चळवळ तीव्र",
  proofSrc: "ichalkaranji-railway-andolan.jpg.jpeg",
  en: {
    title: "Public Movement Official Banner",
    to_whom: "Administration & Citizens",
    description: "The primary digital poster of the public outcry raising questions about the continuous neglect of the city's demands.",
    response: "Agitation Intensified"
  }
},
{
  id: 13,
  date: "2026-05-01",
  category: "movement",
  title: "इचलकरंजी रेल्वे कृती समिती अधिकृत बॅनर",
  to_whom: "सार्वजनिक मंच",
  description: "वस्त्रनगरीच्या बहुजन हिताय बहुजन सुखाय, हातकणंगले-इचलकरंजी रेल्वे म�[...]",
  response: "समिती उद्देश स्पष्ट",
  proofSrc: "ichalkaranji-railway-kruti-samiti-banner.jpg.jpeg",
  en: {
    title: "Official Kruti Samiti Banner",
    to_whom: "Public Forum",
    description: "Introductory information banner highlighting the identity and mission statement of the railway action committee.",
    response: "Mission Declared"
  }
},
{
  id: 14,
  date: "2026-05-20",
  category: "news",
  title: "प्रस्तावित इचलकरंजी रेल्वे स्थानक एआय रूप",
  to_whom: "भविष्यातील आशा",
  description: "भविष्यात मंजुरी मिळाल्यानंतर साकारणारे इचलकरंजी रेल्वे स्थानक प्रत[...]",
  response: "भविष्यातील स्वप्न",
  proofSrc: "proposed-ichalkaranji-railway-station-ai.jpg.jpeg",
  en: {
    title: "Proposed Railway Station Concept Art",
    to_whom: "Future Vision",
    description: "An AI-assisted futuristic representation showcasing the conceptual architectural look of the upcoming Ichalkaranji station.",
    response: "Future Blueprint"
  }
},
{
  id: 15,
  date: "2023-08-14",
  category: "movement",
  title: "प्रथम महापौरांना रेल्वे मागणी निवेदन",
  to_whom: "इचलकरंजी महानगरपालिका प्रथम महापौर",
  description: "इचलकरंजी रेल्वे कृती समिती तर्फे नवनियुक्त पहिल्या महापौरांना महाप��[...]",
  response: "प्रशासकीय पाठपुरावा",
  proofSrc: "ichalkaranji-first-mahapour-railway-nivedan.jpg.jpeg",
  en: {
    title: "Memorandum to the First Mayor",
    to_whom: "First Mayor, Municipal Corporation",
    description: "Kruti Samiti members handing over the official letter to the newly appointed first mayor of Ichalkaranji city.",
    response: "Administrative Liaison"
   }
},
{
  id: 16,
  date: "2024-03-12",
  category: "movement",
  title: "कृती समिती पत्रकार परिषद व निवेदने",
  to_whom: "वृत्तमाध्यमे व पत्रकार",
  description: "नागरिकांकडून गोळा केलेल्या हजारो जनस्वाक्षरी निवेदनांचे गठ्ठे पत्र[...]",
  response: "माध्यम संवाद",
  proofSrc: "ichalkaranji-railway-kruti-samiti-press-conference.jpg.jpeg",
  en: {
    title: "Press Conference with Mass Memorandums",
    to_whom: "Press & Media Rooms",
    description: "Action committee showcasing huge physical bundles of signed public memorandums during a formal media brief.",
    response: "Media Briefing Done"
  }
},
{
  id: 17,
  date: "2024-03-14",
  category: "news",
  title: "पंतप्रधानांना १० हजार पत्रे वृत्तपत्र बातमी",
  to_whom: "केंद्र व राज्य सरकार",
  description: "इचलकरंजीतील शाळा, सामाजिक संस्था व नागरिकांनी मिळून पंतप्रधान नरेंद�[...]",
  response: "पत्रांची दखल",
  proofSrc: "ichalkaranji-railway-10-thousand-letters-news.jpg.jpeg",
  en: {
    title: "10 Thousand Letters to PM: News Coverage",
    to_whom: "Central & State Govts",
    description: "Newspaper clipping describing the unique drive where 10,000 emotional letters were sent to Prime Minister Narendra Modi.",
    response: "Campaign Documented"
  }
},
{
  id: 18,
  date: "2023-08-16",
  category: "news",
  title: "रेल्वे कृती समिती वृत्तपत्र बातमी (महापौर बैठक)",
  to_whom: "महापौर व स्थानिक आमदार",
  description: "आमदार व खासदारांसोबत रेल्वे मंत्रालयात तातडीने संयुक्त बैठक घडवून आ�[...]",
  response: "बैठक मागणी",
  proofSrc: "ichalkaranji-railway-news-clipping.jpg.jpeg",
  en: {
    title: "Action Committee Urges Mayor: News Clipping",
    to_whom: "Mayor & Local MLA",
    description: "Media report regarding the committee's call to the mayor to facilitate a joint technical session with MPs and MLAs.",
    response: "Meeting Requested"
  }
},
{
  id: 19,
  date: "2022-11-28",
  category: "news",
  title: "विविध क्षेत्रांतील मान्यवरांचे रेल्वे समर्थन फलक",
  to_whom: "सार्वजनिक समाज",
  description: "डॉक्टर्स, इंजिनिअर्स, वकील आणि टेक्स्टाईल असोसिएशनच्या अध्यक्षांनी �[...]",
  response: "जनमताचा कौल",
  proofSrc: "ichalkaranji-railway-citizen-opinions.jpg.jpeg",
  en: {
    title: "Endorsements from Various Sectors",
    to_whom: "General Society",
    description: "A compiled billboard asset containing positive feedback and appeals from doctors, lawyers, and industry elites for the project.",
    response: "Public Verdict"
  }
},
{
  id: 20,
  date: "2022-11-30",
  category: "news",
  title: "केसरी वृत्तपत्र विशेष पान २०२२",
  to_whom: "सार्वजनिक वाचक",
  description: "इचलकरंजीच्या वस्त्रोद्योगासाठी आणि कामगारांसाठी रेल्वे किती आवश्य�[...]",
  response: "विशेष आवृत्ती प्रसिद्ध",
  proofSrc: "kesari-special-page-ichalkaranji-railway.jpg.jpeg",
  en: {
    title: "Dainik Kesari Special Page 2022",
    to_whom: "General Public",
    description: "Comprehensive coverage featuring opinions from industrialists, doctors, and politicians urging for railway connectivity.",
    response: "Special Issue Released"
   }
},

{
    id: 21,
    date: "2026-03-02",
    category: "petition",
    title: "Change.org याचिका — \"इचलकरंजीला थेट रेल्वे कनेक्टिव्हिटी हवी!\"",
    to_whom: "केंद्रीय रेल्वे मंत्री, महाराष्ट्राचे मुख्यमंत्री, मध्य रेल्वे महाव्[...]",
    description: "हातकणंगले–इचलकरंजी ८ किमी मार्ग तात्काळ राबवण्याची आणि इचलकरंजीला [...]",
    response: "याचिका सध्या स्वाक्षऱ्यांसाठी खुली आहे — आतापर्यंत ३७७ पडताळणी झाले��[...]",
    status: "pending",
    proofType: "link",
    proofSrc: "https://www.change.org/p/ichalkaranji-deserves-direct-rail-connectivity",
    referenceNo: "",
    en: {
      title: "Change.org Petition — \"Ichalkaranji Deserves Direct Rail Connectivity!\"",
      to_whom: "Union Railway Minister, Chief Minister Maharashtra, Central Railway GM, Pune DRM, President of India (via CPGRAMS), and 3 other decision makers",
      description: "Demand to implement the Hatkanangale–Ichalkaranji 8 km line immediately and develop Ichalkaranji into a full-capacity railway station (multiple platforms + freight yard + parking[...],
      response: "Petition currently open for signatures — 377 verified signatures collected so far. No formal response from decision makers yet.",
    },
  },

  {
    id: 22,
    date: "2026-03-13",
    category: "social",
    title: "इंस्टाग्राम रील — \"इचलकरंजीला रेल्वे स्टेशन हवंय!\"",
    to_whom: "जनजागृती — मुख्यमंत्री देवेंद्र फडणवीस, रेल्वे मंत्री अश्विनी वैष्णव[...]",
    description: "@manchester_of_maharashtra ची रील, @untold_ichalkaranji सोबत सहकार्याने. इचलकरंजीला रेल्वे स्थानक ��[...]",
    response: "या पोस्टवर २,०६,९७६ व्ह्यूज, ९२,६२७ खाती पोहोचली, २,६६० लाइक्स, ८३ कमेंट्[...]",
    status: "no-response",
    proofType: "link",
    proofSrc: "https://www.instagram.com/reel/DVy-V1hDaAP/",
    referenceNo: "",
    en: {
      title: "Instagram Reel — \"Ichalkaranji Needs a Railway Station!\"",
      to_whom: "Public awareness — tagging CM Devendra Fadnavis, Railway Minister Ashwini Vaishnaw, and local officials",
      description: "A reel by @manchester_of_maharashtra, in collaboration with @untold_ichalkaranji, raising awareness on why Ichalkaranji needs a railway station (new 8 km line, DPR ready, budget al[...]",
      response: "206,976 views, 92,627 accounts reached, 2,660 likes, 83 comments, 1,206 shares, 153 new follows from this post. No direct reply from tagged officials yet.",
    },
  },

  {
    id: 23,
    date: "2026-03-28",
    category: "rti",
    title: "RTI उत्तर — उप मुख्य अभियंता/बांधकाम, सातारा",
    to_whom: "उप मुख्य अभियंता/बांधकाम, मध्य रेल्वे, सातारा",
    description: "प्रकल्पाची सद्यस्थिती (भौतिक/आर्थिक प्रगती), भूसंपादनाची स्थिती, DPR च��[...]",
    response: "सर्व ७ प्रश्नांना एकच उत्तर: DPR रेल्वे बोर्डाकडे २०१८ मध्ये सादर करण्य��[...]",
    status: "replied",
    proofType: "image",
    proofSrc: "rti-reply-satara-10apr2026.jpg",
    referenceNo: "DRMOP/R/E/26/00107",
    en: {
      title: "RTI Reply — Dy. Chief Engineer/Const., Satara",
      to_whom: "Dy. Chief Engineer/Construction, Central Railway, Satara",
      description: "Asked 7 detailed questions on the project's current physical/financial progress, land acquisition status, DPR status, sanctioned cost, timeline, and reasons for delay.",
      response: "A single reply covering all 7 questions: the DPR was submitted to the Railway Board in 2018. The project has not yet been sanctioned by the Railway Board and no work has started.",
    },
  },

  {
    id: 24,
    date: "2026-05-14",
    category: "rti",
    title: "RTI हस्तांतरण आदेश — मध्य रेल्वे पुणे विभाग",
    to_whom: "वरिष्ठ विभागीय अभियंता (समन्वय) व CPIO, पुणे विभाग → उप मुख्य अभियंता/बांध��[...]",
    description: "RTI अर्ज कलम ६(३) अंतर्गत योग्य विभागाकडे हस्तांतरित करण्यात आला, कारण म[...]",
    response: "RTI अधिकृतपणे १५.०५.२०२६ रोजी उप मुख्य अभियंता/बांधकाम, सातारा यांच्याक��[...]",
    status: "pending",
    proofType: "pdf",
    proofSrc: "rti-transfer-order-15may2026.pdf",
    referenceNo: "DRMOP/R/P/24/00164",
    en: {
      title: "RTI Transfer Order — Central Railway Pune Division",
      to_whom: "Sr. Divisional Engineer (Co-ord) & CPIO, Pune Division → transferred to Dy CE/Construction, Satara",
      description: "The RTI application was transferred under Section 6(3) to the appropriate department, as the information sought related to Dy CE/Construction, Satara.",
      response: "RTI officially transferred on 15.05.2026 to Dy CE/Construction, Satara for direct disposal.",
    },
  },

  {
    id: 25,
    date: "2026-05-27",
    category: "rti",
    title: "RTI पाठपुरावा — सविस्तर ७ प्रश्नांची यादी",
    to_whom: "वरिष्ठ विभागीय अभियंता (समन्वय), पुणे, प्रत CRPG, उप CPO, मध्य रेल्वे अधिकारी",
    description: "हस्तांतरित झालेल्या RTI चा पाठपुरावा — DPR ची स्थिती, PEC बैठका, विलंबाची ने[...]",
    response: "अद्याप कोणतेही उत्तर मिळालेले नाही (या पाठपुराव्याच्या सादरीकरणापर[...]",
    status: "pending",
    proofType: "pdf",
    proofSrc: "rti-followup-questionnaire-27may2026.pdf",
    referenceNo: "DRMOP/R/E/26/00164",
    en: {
      title: "RTI Follow-up — Detailed 7-Point Questionnaire",
      to_whom: "Pune Sr. DEN (Co-ord), cc CRPG, Dy CPO, Central Railway officials",
      description: "Follow-up on the transferred RTI — 7 detailed questions on DPR status, PEC meetings, specific reasons for delay, revised ROR/FIRR, revised cost, a time-bound action plan, and Pin[...]",
      response: "No response received yet (as of this follow-up submission).",
    },
  },

  {
    id: 26,
    date: "2026-06-17",
    category: "grievance",
    title: "CPGRAMS तक्रार उत्तर — मध्य रेल्वे CAO (बांधकाम)",
    to_whom: "PMO तक्रार कक्ष (CPGRAMS) → उप CE(C)PLG व CPIO प्रदीप बनसोडे यांच्याकडून उत्तर",
    description: "इचलकरंजीची आर्थिक बाजू (महाराष्ट्राचे मँचेस्टर, मोठी मालवाहतूक क्ष��[...]",
    response: "मध्य रेल्वेने अधिकृतपणे पुष्टी केली: DPR प्रथम ३०.११.२०१७ रोजी सादर — खर्[...]",
    status: "replied",
    proofType: "pdf",
    proofSrc: "grievance-reply-bansode-02jul2026.pdf",
    referenceNo: "PMOPG/E/2026/0107756",
    en: {
      title: "CPGRAMS Grievance Reply — Central Railway CAO(Const.)",
      to_whom: "PMO Grievance Cell (CPGRAMS) → answered by Dy CE(C)PLG & CPIO Pradeep Bansode",
      description: "Presented Ichalkaranji's economic case (Manchester of Maharashtra, high freight potential), alignment with PM Gati Shakti, and requested reviving the Karad–Ichalkaranji–Nipani�[...]",
      response: "Central Railway officially confirmed: DPR first submitted 30.11.2017 — cost ₹191.59 crore, ROR -10.11%. Revised DPR submitted 02.01.2020 — cost ₹180.73 crore, ROR -12.73%. The[...]",
    },
  },

  {
    id: 27,
    date: "2026-05-27",
    category: "letter",
    title: "सामाजिक-आर्थिक निकषांवर पुनर्विचारासाठी विनंती (ROR −१२.७३%)",
    to_whom: "सचिव, रेल्वे बोर्ड; प्रत अध्यक्ष रेल्वे बोर्ड, DRM पुणे, रेल्वे मंत्री कार[...]",
    description: "नकारात्मक ROR च्या आधारावर प्रकल्प नाकारण्याऐवजी, PM गती शक्ती मार्गदर��[...]",
    response: "अद्याप कोणतेही उत्तर मिळालेले नाही.",
    status: "no-response",
    proofType: "pdf",
    proofSrc: "letter-railway-board-27may2026.pdf",
    referenceNo: "",
    en: {
      title: "Appeal for Reconsideration on Socio-Economic Grounds (ROR -12.73%)",
      to_whom: "Secretary, Railway Board; cc Chairman RB, DRM Pune, Office of Minister of Railways",
      description: "Appeal not to reject the project on the basis of negative ROR, but to reconsider it on socio-economic grounds under PM Gati Shakti guidelines. Proposed a 50:50 state cost-sharing m[...]",
      response: "No response received yet.",
    },
  },

  {
    id: 28,
    date: "2026-05-29",
    category: "letter",
    title: "पत्र — खासदार श्रीकांत शिंदे (शिवसेना)",
    to_whom: "खासदार धैर्यशील माने यांचे कार्यालय / शिवसेना केंद्रीय कार्यालय, प्रत [...]",
    description: "खासदारांच्या इचलकरंजी भेटीचे स्वागत, आणि रेल्वे मार्गासाठी जलद कार��[...]",
    response: "अद्याप कोणतेही उत्तर मिळालेले नाही.",
    status: "no-response",
    proofType: "pdf",
    proofSrc: "letter-shrikant-shinde-29may2026.pdf",
    referenceNo: "",
    en: {
      title: "Letter — MP Shrikant Shinde (Shivsena)",
      to_whom: "MP Dhairyashil Mane's office / Shivsena Central Office, cc CM Devendra Fadnavis",
      description: "Welcomed the MP's planned visit to Ichalkaranji, and requested fast-tracking action on the railway line — noting that earlier assurances had not translated into concrete action.[...]",
      response: "No response received yet.",
    },
  },

  {
    id: 29,
    date: "2026-06-07",
    category: "letter",
    title: "तीव्र आक्षेप — शंकेश्वर–पारकनट्टी सर्वेक्षण; कराड–इचलकरंजी–निपाणी–[...]",
    to_whom: "अध्यक्ष, रेल्वे बोर्ड; प्रत पंतप्रधान कार्यालय, रेल्वे मंत्री, मुख्यमं[...]",
    description: "बेळगाव–कोल्हापूर मार्गासाठी इचलकरंजीला वगळणाऱ्या नवीन शंकेश्वर–प[...]",
    response: "२ ईमेल पत्ते (devendrafadnavis@yahoo.com, contact@devendrafadnavis.in) बाउन्स झाले — अवैध/बंद मेलबॉक्स. वैध[...]",
    status: "no-response",
    proofType: "pdf",
    proofSrc: "letter-railway-board-sankeshwar-objection-07jun2026.pdf",
    referenceNo: "",
    en: {
      title: "Strong Objection — Sankeshwar–Parknatti Survey; Request for Karad–Ichalkaranji–Nipani–Belagavi Route",
      to_whom: "Chairman Railway Board; cc PM Office, Railway Minister, CM Maharashtra, GM Pune Division, MPs/MLAs",
      description: "Raised strong objection to the new Sankeshwar–Parknatti survey for the Belagavi–Kolhapur line, which bypasses Ichalkaranji. Made 5 specific demands for immediate approval of th[...]",
      response: "2 email addresses (devendrafadnavis@yahoo.com, contact@devendrafadnavis.in) bounced — invalid/disabled mailbox. No response yet from the valid recipients.",
    },
  },

  {
    id: 30,
    date: "2026-06-09",
    category: "letter",
    title: "पत्र — केंद्रीय गृहमंत्री अमित शाह",
    to_whom: "केंद्रीय गृहमंत्री अमित शाह",
    description: "२१ जूनच्या इचलकरंजी भेटीचे स्वागत, आणि रेल्वे कनेक्टिव्हिटीच्या वर��[...]",
    response: "अद्याप कोणतेही उत्तर मिळालेले नाही.",
    status: "no-response",
    proofType: "pdf",
    proofSrc: "letter-amit-shah-09jun2026.pdf",
    referenceNo: "",
    en: {
      title: "Letter — Union Home Minister Amit Shah",
      to_whom: "Union Home Minister Amit Shah",
      description: "Welcomed the Union Home Minister's visit to Ichalkaranji on 21 June, and requested his personal attention to the decades-long pending demand for rail connectivity.",
      response: "No response received yet.",
    },
  },

  {
    id: 31,
    date: "2026-05-09",
    category: "letter",
    title: "तातडीचे — केंद्रीय वस्त्रोद्योग मंत्री गिरिराज सिंह",
    to_whom: "केंद्रीय वस्त्रोद्योग मंत्री गिरिराज सिंह, प्रत मुख्यमंत्री देवेंद्�[...]",
    description: "इचलकरंजीच्या वस्त्रोद्योगासाठी रेल्वे कनेक्टिव्हिटी किती महत्त्व[...]",
    response: "अद्याप कोणतेही उत्तर मिळालेले नाही.",
    status: "no-response",
    proofType: "pdf",
    proofSrc: "letter-textile-minister-giriraj-09may2026.pdf",
    referenceNo: "",
    en: {
      title: "URGENT — Union Textile Minister Giriraj Singh",
      to_whom: "Union Minister of Textiles Giriraj Singh, cc CM Devendra Fadnavis",
      description: "Set out how crucial rail connectivity is for Ichalkaranji's textile industry, citing the official status — DPR cost ₹180.73 crore, ROR -12.73%, and zero physical progress as of[...]",
      response: "No response received yet.",
    },
  },

  {
    id: 32,
    date: "2026-05-09",
    category: "letter",
    title: "पत्र — राज्य वस्त्रोद्योग मंत्री संजय सावकारे",
    to_whom: "महाराष्ट्र वस्त्रोद्योग मंत्री संजय सावकारे, प्रत मुख्यमंत्री फडणवी[...]",
    description: "नकारात्मक ROR मुळे प्रकल्पाला 'विशेष औद्योगिक प्रकल्प' म्हणून मान्यता [...]",
    response: "अद्याप कोणतेही उत्तर मिळालेले नाही.",
    status: "no-response",
    proofType: "pdf",
    proofSrc: "letter-sanjay-savkare-09may2026.pdf",
    referenceNo: "",
    en: {
      title: "Letter — Maharashtra Textile Minister Sanjay Savkare",
      to_whom: "Maharashtra Textile Minister Sanjay Savkare, cc CM Fadnavis, Collector Kolhapur",
      description: "Demanded that the project be granted 'Special Industrial Project' status because of the negative ROR, 50% cost-sharing from the state government to improve the ROR, and urgent comm[...]",
      response: "No response received yet.",
    },
  },

  {
    id: 33,
    date: "2026-04-06",
    category: "grievance",
    title: "सामूहिक अर्ज — जिल्हाधिकारी कोल्हापूर → महानगरपालिका → मध्य रेल्वे DEN",
    to_whom: "जिल्हाधिकारी कोल्हापूर → इचलकरंजी महानगरपालिका → विभागीय रेल्वे अभि[...]",
    description: "८ किमी मार्ग आणि आधुनिक रेल्वे स्थानकासाठी सामूहिक, आग्रही अर्ज. जिल��[...]",
    response: "अर्ज साखळीतून पुढे पाठवला गेला — प्रत्येक टप्प्यावर 'योग्य ती कार्यवा[...]",
    status: "pending",
    proofType: "pdf",
    proofSrc: "grievance-municipal-corp-forward-jun2026.pdf",
    referenceNo: "I-७१९५०८ / कार्या.११/नपा/आरआर/संक-१/७८/२६",
    en: {
      title: "Joint Application — Collector Kolhapur → Municipal Corporation → Central Railway DEN",
      to_whom: "Collector Kolhapur → Ichalkaranji Municipal Corporation → Divisional Railway Engineer, Central Railway Pune",
      description: "A collective, urgent application for the 8 km line and a modern railway station. The Collector's office forwarded it on 15.04.2026; the Municipal Corporation forwarded it to the Ce[...]",
      response: "The application was forwarded through the chain — at every stage the instruction given was 'take appropriate action.' No substantive reply yet.",
    },
  },

  {
    id: 34,
    date: "2017-06-11",
    category: "media",
    title: "ऐतिहासिक: हातकणंगले–इचलकरंजी सर्वेक्षणासाठी भूमिपूजन",
    to_whom: "सार्वजनिक नोंद — मध्य रेल्वेचा अधिकृत कार्यक्रम",
    description: "कराड येथे झालेल्या कार्यक्रमात, तत्कालीन रेल्वे मंत्री सुरेश प्रभू �[...]",
    response: "२०१७ साली सर्वेक्षणाचे भूमिपूजन झाले, पण अद्याप प्रकल्प मंजूर झालेला [...]",
    status: "replied",
    proofType: "pdf",
    proofSrc: "pinkbook-and-2017-history.pdf",
    referenceNo: "",
    en: {
      title: "Historical: Foundation Stone Laid for Hatkanangale-Ichalkaranji Survey",
      to_whom: "Public record — Central Railway official event",
      description: "At an event in Karad, then Railway Minister Suresh Prabhu laid the foundation stone for the Final Location Survey of the Hatkanangale–Ichalkaranji New Line, alongside the Vaibhav[...]",
      response: "The survey's foundation stone was laid in 2017, but the project remains unsanctioned to date.",
    },
  },

  {
    id: 35,
    date: "2022-11-30",
    category: "media",
    title: "बातमी — दैनिक केसरी: \"रेल्वे कृती समिती प्रयत्नशील\"",
    to_whom: "सार्वजनिक वृत्तांकन — दैनिक केसरी, इचलकरंजी आवृत्ती",
    description: "इचलकरंजी रेल्वे कृती समिती गेल्या १९-२० वर्षांपासून सातत्यपूर्ण प्��[...]",
    response: "लागू नाही — मोहिमेच्या दीर्घकालीन प्रयत्नाचे प्रसारमाध्यम वृत्तांक�[...]",
    status: "replied",
    proofType: "image",
    proofSrc: "news-kesari-30nov2022.jpg",
    referenceNo: "",
    en: {
      title: "News — Dainik Kesari: \"Railway Action Committee Keeps Trying\"",
      to_whom: "Public coverage — Dainik Kesari, Ichalkaranji edition",
      description: "Special coverage on the Ichalkaranji Railway Action Committee's continuous 19–20-year effort, featuring reactions from local citizens, backward-class activists, and trade associa[...]",
      response: "N/A — press coverage of the campaign's long-running effort.",
    },
  },

  {
    id: 36,
    date: "2026-05-12",
    category: "media",
    title: "बातमी — दैनिक पुढारी: \"सर्वेक्षणानंतरही मार्ग रखडलेलाच\"",
    to_whom: "सार्वजनिक वृत्तांकन — दैनिक पुढारी, माय कोल्हापूर आवृत्ती",
    description: "सर्वेक्षण पूर्ण झाले असतानाही हातकणंगले–इचलकरंजी रेल्वे मार्ग रखड�[...]",
    response: "लागू नाही — प्रसारमाध्यम वृत्तांकन.",
    status: "replied",
    proofType: "image",
    proofSrc: "news-pudhari-12may2026.jpg",
    referenceNo: "",
    en: {
      title: "News — Dainik Pudhari: \"Route Still Stalled Even After the Survey\"",
      to_whom: "Public coverage — Dainik Pudhari, My Kolhapur Edition",
      description: "Coverage on how the Hatkanangale–Ichalkaranji rail route remains stalled despite the survey being completed. Mentions former Railway Minister Suresh Prabhu's 2017 approval, and n[...]",
      response: "N/A — press coverage.",
    },
  },

  {
    id: 37,
    date: "2026-04-16",
    category: "letter",
    title: "बातमी — मास लेटर मोहीम: राज्य सरकारला \"भावनिक साद\"",
    to_whom: "पंतप्रधान, मुख्यमंत्री, राज्य/केंद्रीय मंत्री, खासदार, आमदार — मोठ्या ��[...]",
    description: "रेल्वे कृती समितीने २०११ साली नवीन पाठपुरावा मोहीम सुरू केली होती, त��[...]",
    response: "लागू नाही — मास लेटर मोहिमेचे प्रसारमाध्यम वृत्तांकन.",
    status: "no-response",
    proofType: "image",
    proofSrc: "news-10000-letters-campaign.jpg",
    referenceNo: "",
    en: {
      title: "News — Mass Letter Campaign: \"An Emotional Appeal\" to the State Government",
      to_whom: "PM, CM, State/Central Ministers, MPs, MLAs — via mass postcard campaign",
      description: "The Railway Action Committee had launched a fresh follow-up campaign in 2011; as part of it, 10,000 letters for Hatkanangale–Ichalkaranji were sent to the CM and the PM — cover[...]",
      response: "N/A — press coverage of the mass letter-writing campaign.",
    },
  },

  {
    id: 38,
    date: "2026-02-26",
    category: "media",
    title: "बातमी — दैनिक केसरी: धरणे आंदोलनाला पाठिंबा",
    to_whom: "सार्वजनिक वृत्तांकन — दैनिक केसरी",
    description: "इचलकरंजी रेल्वे कृती समितीने जिल्हाधिकारी कार्यालयासमोर एकदिवसीय �[...]",
    response: "आंदोलनानंतर राजकीय पुढाऱ्यांनी सक्रिय सहकार्याचे आश्वासन दिले, पण व��[...]",
    status: "no-response",
    proofType: "image",
    proofSrc: "news-kesari-dharna-26feb2026.jpg",
    referenceNo: "",
    en: {
      title: "News — Dainik Kesari: Sit-in Protest Support",
      to_whom: "Public coverage — Dainik Kesari",
      description: "The Ichalkaranji Railway Action Committee held a one-day sit-in protest outside the Collector's office. Various social, political, and cooperative organisations, along with railway[...]",
      response: "After the protest, political leaders assured active cooperation, but the Hatkanangale–Ichalkaranji project remains pending, year after year, due to political apathy and lack of fund[...]",
    },
  },

  {
    id: 39,
    date: "2026-04-01",
    category: "letter",
    title: "महापौरांना निवेदन — इचलकरंजी महानगरपालिका",
    to_whom: "महापौर, इचलकरंजी महानगरपालिका",
    description: "रेल्वे कृती समितीने महापौरांना निवेदन दिले — खासदार, आमदार, आणि पालक��[...]",
    response: "महापौरांनी निवेदन स्वीकारले, औपचारिक पाठपुरावा अद्याप प्रलंबित.",
    status: "pending",
    proofType: "image",
    proofSrc: "photo-mayor-meeting-01apr2026.jpg",
    referenceNo: "",
    en: {
      title: "Memorandum to Mayor — Ichalkaranji Municipal Corporation",
      to_whom: "Mayor, Ichalkaranji Municipal Corporation",
      description: "The Railway Action Committee submitted a memorandum to the Mayor, requesting a special meeting with the MP, MLA, and Guardian Minister, and asking for property/GST-related issues t[...]",
      response: "The Mayor accepted the memorandum; formal follow-up is still pending.",
    },
  },

  {
    id: 40,
    date: "2026-04-12",
    category: "media",
    title: "बातमी — नागरिक प्रतिक्रिया विशेष पुरवणी",
    to_whom: "सार्वजनिक वृत्तांकन — रेल्वे विषयावरील विशेष पुरवणी",
    description: "इचलकरंजी शहरातील ३०+ प्रतिष्ठित नागरिकांच्या (व्यापारी संघटना अध्य��[...]",
    response: "लागू नाही — समुदायाचे मत नोंदवणारे प्रसारमाध्यम वृत्तांकन.",
    status: "replied",
    proofType: "image",
    proofSrc: "news-citizen-testimonials-apr2026.jpg",
    referenceNo: "",
    en: {
      title: "News — Citizen Testimonials Special Supplement",
      to_whom: "Public coverage — special railway-issue supplement",
      description: "A special supplement featuring personal reactions to the railway line from 30+ prominent citizens of Ichalkaranji (business association presidents, doctors, lawyers, teachers, form[...]",
      response: "N/A — press coverage collecting community voices.",
    },
  },

  {
    id: 41,
    date: "2026-05-09",
    category: "media",
    title: "बातमी — राष्ट्रगीत: खासदार माने यांचे निधी आश्वासन",
    to_whom: "सार्वजनिक वृत्तांकन — दैनिक राष्ट्रगीत",
    description: "खासदार धैर्यशील माने यांनी रेल्वे कृती समितीच्या बैठकीत आश्वासन दि��[...]",
    response: "आश्वासन दिले गेले, पण अद्याप प्रत्यक्ष निधी वितरण झालेले नाही.",
    status: "pending",
    proofType: "image",
    proofSrc: "news-mp-funding-assurance-09may2026.jpg",
    referenceNo: "",
    en: {
      title: "News — Rashtragee: MP Mane's Funding Assurance",
      to_whom: "Public coverage — Dainik Rashtragee",
      description: "MP Dhairyashil Mane assured the Railway Action Committee at a meeting that funds would be available within a month and a half — around ₹200 crore before Diwali, split as ₹100[...]",
      response: "The assurance was given, but actual fund disbursement has not happened yet.",
    },
  },

  {
    id: 42,
    date: "2026-04-12",
    category: "letter",
    title: "मोठ्या प्रमाणावरील पोस्टकार्ड मोहीम — छायाचित्र पुरावा",
    to_whom: "पंतप्रधान, मुख्यमंत्री, राज्य/केंद्रीय मंत्री — मोठ्या प्रमाणावरील प��[...]",
    description: "हजारो पोस्टकार्ड्स बांधून प्रेस रूममध्ये काढलेले छायाचित्र — मास ल��[...]",
    response: "लागू नाही — मास मेलिंग मोहिमेचा भौतिक पुरावा.",
    status: "no-response",
    proofType: "image",
    proofSrc: "photo-postcards-bundle-apr2026.jpg",
    referenceNo: "",
    en: {
      title: "Mass Postcard Campaign — Photo Evidence",
      to_whom: "PM, CM, State/Central Ministers — via bulk postcard mailing",
      description: "Thousands of postcards bundled together, photographed in the press room — physical evidence of the mass letter-writing campaign, related to Kesari's '10,000 letters' coverage (en[...]",
      response: "N/A — physical evidence of the mass mailing campaign.",
    },
  },

  {
    id: 43,
    date: "2024-05-06",
    category: "media",
    title: "बातमी — राष्ट्रगीत: भाजप रेल्वे सेल संयोजक कैलास वर्मा यांचे दिल्ली बै��[...]",
    to_whom: "सार्वजनिक वृत्तांकन — दैनिक राष्ट्रगीत",
    description: "भाजप महाराष्ट्र रेल्वे समितीचे प्रदेश प्रकोष्ठ संयोजक कैलास वर्मा ��[...]",
    response: "लागू नाही — २०२४ च्या लोकसभा निवडणुकीपूर्वी दिलेल्या राजकीय आश्वासन��[...]",
    status: "replied",
    proofType: "image",
    proofSrc: "news-kailash-verma-06may2024.jpg",
    referenceNo: "",
    en: {
      title: "News — Rashtragee: BJP Railway Cell Convener Kailash Verma's Delhi Meeting Promise",
      to_whom: "Public coverage — Dainik Rashtragee",
      description: "Kailash Verma, convener of the BJP Maharashtra Railway Cell's state wing, visited Ichalkaranji and assured the Railway Action Committee that once the Lok Sabha model code of conduc[...]",
      response: "N/A — press coverage of a political assurance given before the 2024 Lok Sabha elections.",
    },
  },

  {
    id: 44,
    date: "2024-05-04",
    category: "media",
    title: "बातमी — पुढारी: \"रेल्वे प्रश्न ऐरणीवर\" (२०२४ निवडणूक वृत्तांकन)",
    to_whom: "सार्वजनिक वृत्तांकन — दैनिक पुढारी, माय कोल्हापूर आवृत्ती",
    description: "लोकसभा निवडणुकीत इचलकरंजी रेल्वे प्रश्नावर उमेदवारांची दुटप्पी भू�[...]",
    response: "लागू नाही — २०२४ निवडणूक काळातील वृत्तांकन.",
    status: "replied",
    proofType: "image",
    proofSrc: "news-pudhari-election-04may2024.jpg",
    referenceNo: "",
    en: {
      title: "News — Pudhari: \"Railway Issue Takes Centre Stage\" (2024 Election Coverage)",
      to_whom: "Public coverage — Dainik Pudhari, My Kolhapur Edition",
      description: "During the Lok Sabha election, candidates showed a contradictory stance on the Ichalkaranji railway issue — one had written a letter supporting the railway, but a few days later [...]",
      response: "N/A — press coverage during 2024 election cycle.",
    },
  },

  {
    id: 45,
    date: "2026-05-12",
    category: "media",
    title: "बातमी — राष्ट्रगीत: सुरेश प्रभूंची विलंबाबाबत नाराजी",
    to_whom: "सार्वजनिक वृत्तांकन — दैनिक राष्ट्रगीत",
    description: "माजी केंद्रीय रेल्वे मंत्री सुरेश प्रभू इचलकरंजीच्या आपटे वाचन मंद��[...]",
    response: "लागू नाही — माजी रेल्वे मंत्र्यांच्या सार्वजनिक विधानाचे वृत्तांकन.",
    status: "no-response",
    proofType: "image",
    proofSrc: "news-suresh-prabhu-naraji-12may2026.jpg",
    referenceNo: "",
    en: {
      title: "News — Rashtragee: Suresh Prabhu's Displeasure Over Delay",
      to_whom: "Public coverage — Dainik Rashtragee",
      description: "Former Union Railway Minister Suresh Prabhu came to Ichalkaranji for a lecture at Apte Vachan Mandir; the Railway Action Committee publicly felicitated him for granting approval in[...]",
      response: "N/A — press coverage of former Railway Minister's public statement.",
    },
  },

  {
    id: 46,
    date: "2026-06-21",
    category: "letter",
    title: "प्रत्यक्ष भेट — केंद्रीय गृहमंत्री अमित शाह यांना निवेदन सुपूर्द",
    to_whom: "केंद्रीय गृहमंत्री अमित शाह",
    description: "इचलकरंजी भेटीदरम्यान, कृती समितीच्या प्रतिनिधींनी प्रत्यक्ष भेटून [...]",
    response: "निवेदन स्वीकारले गेले; औपचारिक लेखी उत्तर अद्याप आलेले नाही.",
    status: "pending",
    proofType: "image",
    proofSrc: "photo-amit-shah-meeting-21jun2026.jpg",
    referenceNo: "",
    en: {
      title: "In-Person Meeting — Memorandum Handed to Union Home Minister Amit Shah",
      to_whom: "Union Home Minister Amit Shah",
      description: "During his visit to Ichalkaranji, representatives of the Action Committee personally met Union Home Minister Amit Shah and handed over a memorandum on the railway demand — physic[...]",
      response: "Memorandum accepted; a formal written response has not been received yet.",
    },
  },

  {
    id: 47,
    date: "2026-04-01",
    category: "letter",
    title: "लोकसभा — खासदार धैर्यशील माने यांनी इचलकरंजी रेल्वे प्रश्न उपस्थित के�[...]",
    to_whom: "लोकसभा / रेल्वे मंत्रालय (संसदेच्या सभागृहात मांडले)",
    description: "खासदार धैर्यशील माने यांनी लोकसभेत इचलकराजीचा रखडलेला रेल्वे प्रश्[...]",
    response: "लागू नाही — संसदीय प्रतिनिधित्वाची अधिकृत नोंद.",
    status: "no-response",
    proofType: "video",
    proofSrc: "video-loksabha-dhairyashil-mane.mp4",
    referenceNo: "",
    en: {
      title: "Lok Sabha — MP Dhairyashil Mane Raises Ichalkaranji Railway Issue",
      to_whom: "Lok Sabha / Ministry of Railways (raised on the floor of Parliament)",
      description: "MP Dhairyashil Mane raised the long-pending Ichalkaranji railway issue in the Lok Sabha — expressing concern over the 8 km line that had been stalled for years. (Exact session da[...]",
      response: "N/A — parliamentary representation on record.",
    },
  },

  {
    id: 48,
    date: "2025-03-17",
    category: "letter",
    title: "लोकसभा अधिवेशन (१७ मार्च २०२५) — कोल्हापूर-इचलकरंजी व कोल्हापूर-वैभववा��[...]",
    to_whom: "लोकसभा / रेल्वे मंत्रालय (संसदेच्या सभागृहात मांडले)",
    description: "१७ मार्च २०२५ च्या लोकसभा अधिवेशनात एका खासदारांनी कोल्हापूर-इचलकर[...]",
    response: "लागू नाही — संसदीय प्रतिनिधित्वाची अधिकृत नोंद.",
    status: "no-response",
    proofType: "video",
    proofSrc: "video-loksabha-17mar2025.mp4",
    referenceNo: "",
    en: {
      title: "Lok Sabha Session (17 March 2025) — Kolhapur-Ichalkaranji & Kolhapur-Vaibhavwadi Lines",
      to_whom: "Lok Sabha / Ministry of Railways (raised on the floor of Parliament)",
      description: "In the Lok Sabha session of 17 March 2025, an MP strongly raised his voice for both the Kolhapur–Ichalkaranji and Kolhapur–Vaibhavwadi railway routes.",
      response: "N/A — parliamentary representation on record.",
    },
  },

  {
    id: 49,
    date: "2024-11-08",
    category: "letter",
    title: "निवडणूक प्रचारसभा — केंद्रीय गृहमंत्री अमित शाह यांना निवेदन सुपूर्द",
    to_whom: "केंद्रीय गृहमंत्री अमित शाह (महाराष्ट्र विधानसभा निवडणूक प्रचार दौऱ्[...]",
    description: "२०२४ च्या महाराष्ट्र विधानसभा निवडणुकीच्या प्रचारसभेत, रेल्वे कृती[...]",
    response: "निवेदन स्वीकारले गेले; औपचारिक उत्तर आलेले नाही.",
    status: "no-response",
    proofType: "video",
    proofSrc: "video-amit-shah-election-rally-08nov2024.mp4",
    referenceNo: "",
    en: {
      title: "Election Rally — Memorandum Submitted to Union Home Minister Amit Shah",
      to_whom: "Union Home Minister Amit Shah (during Maharashtra Assembly election campaign visit)",
      description: "During the 2024 Maharashtra Assembly election campaign rally, a member of the Railway Action Committee handed a memorandum on the railway demand to Amit Shah.",
      response: "The memorandum was accepted; a formal response has not arrived.",
    },
  },

  {
    id: 50,
    date: "2026-07-29",
    category: "rti",
    title: "RTI उत्तर — निधी मंजुरी व DPR स्थिती (Ref. OL-272)",
    to_whom: "मुख्य प्रशासकीय अधिकारी (निर्माण), मध्य रेल्वे, मुंबई",
    description: "हातकणंगले–इचलकरंजी (8 किमी) प्रकल्पासाठी 2017 पासून वर्षनिहाय किती निध��[...]",
    response: "प्रकल्प 2017-18 च्या Pink Book मध्ये समाविष्ट; 2017 ते 2026 या काळात एकूण ₹12.2005 कोटी निधी [...]",
    status: "replied",
    proofType: "image",
    proofSrc: "WhatsApp Image 2026-08-05 at 2.45.10 PM.jpeg",
    referenceNo: "EW/106/RTI/2026/OL-272 (RTI Appl. No. CRAIL/R/P/26/00177)",
    en: {
      title: "RTI Reply — Fund Sanction & DPR Status (Ref. OL-272)",
      to_whom: "Chief Administrative Officer (Const.), Central Railway, Mumbai",
      description: "Asked 3 questions: year-wise funds sanctioned for the Hatkanangale–Ichalkaranji (8 km) project since 2017 with certified proof, how much of the state government's 50% share has b[...]",
      response: "The project featured in the 2017-18 Pink Book; total funds allocated for 2017–2026 are ₹12.2005 crore (expenditure to occur only after due processes/approvals). The project is not[...]",
    },
  },

  {
    id: 51,
    date: "2026-07-29",
    category: "rti",
    title: "RTI उत्तर — Traffic Survey, फाईल नोटिंग्ज व निधी तपशील (Ref. OL-270)",
    to_whom: "मुख्य प्रशासकीय अधिकारी (निर्माण), मध्य रेल्वे, मुंबई",
    description: "ROR -12.73% कशी निश्चित झाली याचा Traffic Survey Report व Financial Appraisal Note, 2020-2026 दरम्यानच्या रेल्व�[...]",
    response: "DPR 02.01.2020 रोजी ₹180.73 कोटी व ROR (-12.73%) सह सादर; अद्याप मंजूर न झाल्याने Traffic Survey/Financial Apprai[...]",
    status: "replied",
    proofType: "image",
    proofSrc: "WhatsApp Image 2026-08-05 at 2.45.15 PM.jpeg",
    referenceNo: "EW/106/RTI/2026/OL-270 (RTI Appl. No. CRAIL/R/P/26/00176)",
    en: {
      title: "RTI Reply — Traffic Survey, File Notings & Fund Details (Ref. OL-270)",
      to_whom: "Chief Administrative Officer (Const.), Central Railway, Mumbai",
      description: "Asked 5 detailed questions: the Traffic Survey Report and Financial Appraisal Note behind the -12.73% ROR figure, Railway Board file notings/green sheets from 2020-2026, the maximu[...]",
      response: "The DPR was submitted on 02.01.2020 at ₹180.73 crore with ROR (-12.73%); as it is not yet sanctioned, Traffic Survey/Financial Appraisal details cannot be shared. File notings were [...]",
    },
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
