// ============================================================================
// SHARED FIREBASE CONFIG — मतदान (opinion) विजेटसाठी एकच जागा.
// इथे भरलेले values opinion.html, index.html (होमपेजवरचा मतदान विजेट), आणि
// admin.html (मतदान निकाल टॅब) या तिन्ही ठिकाणी आपोआप वापरले जातात —
// त्यामुळे आता ही माहिती फक्त इथेच एकदा भरायची आहे, बाकी कुठेही नाही.
//
// कसं भरायचं (एकदाच, ~10 मिनिटं):
//
// 1) https://console.firebase.google.com -> "Add project" -> मोफत Spark plan
//    पुरेसा आहे. नाव काहीही द्या, उदा. "ichalkaranji-railway".
//
// 2) नवीन प्रोजेक्टमध्ये: Build -> Firestore Database -> Create database ->
//    "production mode" निवडा -> भारताजवळचा region घ्या (उदा. asia-south1) ->
//    Enable करा.
//
// 3) Firestore -> Rules टॅब -> खालील नियम paste करून Publish करा:
//
//      rules_version = '2';
//      service cloud.firestore {
//        match /databases/{database}/documents {
//          match /votes/{voteId} {
//            allow create: if request.resource.data.vote in ['होय','नाही']
//                          && request.resource.data.keys().hasOnly(['vote','timestamp']);
//            allow read, update, delete: if false;
//          }
//          match /voter_details/{id} {
//            allow create: if true;
//            allow read, update, delete: if false;
//          }
//          match /meta/counts {
//            allow read: if true;
//            allow create: if request.resource.data.keys().hasOnly(['yes','no'])
//                          && request.resource.data.yes is int
//                          && request.resource.data.no is int;
//            allow update: if
//              (request.resource.data.yes == resource.data.yes + 1
//               && request.resource.data.no == resource.data.no) ||
//              (request.resource.data.no == resource.data.no + 1
//               && request.resource.data.yes == resource.data.yes);
//            allow delete: if false;
//          }
//        }
//      }
//
//    ( admin.html मधून "मतदान निकाल" बघण्यासाठी थोडे जास्त उघड नियम हवे असतील
//      तर admin.html मधल्या सूचना वापरा — त्या login केलेल्या admin साठी वेगळ्या
//      rules देतात. )
//
// 4) Project settings (⚙️ आयकॉन) -> General -> "Your apps" -> Web (</>) आयकॉन
//    -> कोणतंही nickname देऊन register करा -> firebaseConfig object दिसेल.
//    तो कॉपी करून खालचे PASTE_YOUR_* values बदला.
//
// जोपर्यंत हे भरलेलं नाही, तोपर्यंत मतदान विजेट दिसतो पण मतं कुठेही सेव्ह होत
// नाहीत आणि live counter लपलेला राहतो — त्यामुळे setup पूर्ण होण्याआधी पेज
// प्रीव्ह्यू करणं सुरक्षित आहे.
// ============================================================================

const FIREBASE_CONFIG = {
  apiKey: "PASTE_YOUR_API_KEY",
  authDomain: "PASTE_YOUR_PROJECT.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_PROJECT.appspot.com",
  messagingSenderId: "PASTE_YOUR_SENDER_ID",
  appId: "PASTE_YOUR_APP_ID"
};
