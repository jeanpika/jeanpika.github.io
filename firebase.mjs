
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
  import{getFirestore, addDoc, getDocs, collection, serverTimestamp} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBRbqu-VOoHIv4WUCfl5-PGBsphgxSTEkI",
    authDomain: "dogs-c2f5d.firebaseapp.com",
    projectId: "dogs-c2f5d",
    storageBucket: "dogs-c2f5d.appspot.com",
    messagingSenderId: "510294934209",
    appId: "1:510294934209:web:7a40f9c25001724b25ca40"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
   window.auth = getAuth();
    const db = getFirestore(app);
//////////////////////////////////////////////////////
//expose functionality for auth

window.islogin = function(){
    return auth.currentUser !== null;
}

window.login = function(email,password){
   return signInWithEmailAndPassword(auth,email,password);
}

window.signup = function(email,password){
    return createUserWithEmailAndPassword(auth,email,password);
 }

 window.logout = function(){
     auth.signOut();
 }

 window.onLogin = function(f){
    onAuthStateChanged(auth, user => {
       f(user);
    });
}
 //////////////////////////////////////////////////
 // expose functionality for database

 window.addComment = function(comment){
    return addDoc(collection(db, "comments"), 
    {comment, posted: serverTimestamp()});
 }

 window.forEachComment = async function( f ){
   var docs = await getDocs( collection(db, "comments") );
   console.log(docs);
   docs.forEach( doc => f(doc.data()) );
}