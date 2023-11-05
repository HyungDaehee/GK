import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';


const firebaseConfig = {
  apiKey: "AIzaSyBYYQ8F-txaYZaDMzHVkGgBiGJ-J_-diQA",
  authDomain: "webdevelop-e9b46.firebaseapp.com",
  databaseURL: "https://webdevelop-e9b46-default-rtdb.firebaseio.com",
  projectId: "webdevelop-e9b46",
  storageBucket: "webdevelop-e9b46.appspot.com",
  messagingSenderId: "1074357081069",
  appId: "1:1074357081069:web:9a5391c97b9aecf7750de4",
  measurementId: "G-P0HYBT1MLD"
};

  const app = initializeApp(firebaseConfig);
  export const messaging = getMessaging(app);

  export default app;
 
 async function requestPermission() {
   console.log("권한 요청 중...");
  
 
   const permission = await Notification.requestPermission();
   if (permission === "denied") {
     console.log("알림 권한 허용 안됨");
     return;
   }
 
   console.log("알림 권한이 허용됨");
 
   const token = await getToken(messaging, {
     vapidKey: "BPMYVhygwwndYMm4k3gevP3zp8fLD6Riq0DZLy_5G4Z9ys_mMMiMBWbavBhgnxYMQRGmNjV8FyZ2LWaW2v_UC-o"
   });
   
 
   if (token) console.log("token: ", token);
   else console.log("Can not get Token");
 
   onMessage(messaging, (payload) => {
     console.log("메시지가 도착했습니다.", payload);
     
   });
   
 }
 
 requestPermission();