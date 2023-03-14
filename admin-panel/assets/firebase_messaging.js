importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');




// Initialize Firebase
var config = {
  apiKey:"Your apiKey" ,
  authDomain:"Your authDomain" ,
  projectId:"Your projectId" ,
  storageBucket:"Your storageBucket" ,
  messagingSenderId:"Your messagingSenderId" ,
  appId:"Your appId",
  measurementId:"Your measurementId" 
};


firebase.initializeApp(config);
const fcm=firebase.messaging();
fcm.getToken({
    vapidKey:"your vapidey"
}).then((token)=>{
    // console.log('getToken');
});



fcm.onBackgroundMessage((data)=>{
    // console.log('onBackgroundMessage - ',data);
})