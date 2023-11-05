import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import app from "../../firebase.js";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth(app);
  
    signOut(auth)
      .then(() => {
        // Firebase 로그아웃 성공
        console.log("로그아웃되었습니다.");
  
        if (auth.currentUser) {
          // Firebase 사용자 정보 초기화
          auth.currentUser.delete().then(() => {
            console.log("Firebase 사용자 정보 초기화 완료.");
          }).catch((error) => {
            console.error("Firebase 사용자 정보 초기화 중 오류 발생:", error);
          });
        }
  
        navigate('/');
      })
      .catch((error) => {
        console.error("Firebase 로그아웃 중 오류 발생:", error);
      });
  };
  
  

  return (
      <button onClick={handleLogout}>로그아웃</button>
  );
};

export default Logout;