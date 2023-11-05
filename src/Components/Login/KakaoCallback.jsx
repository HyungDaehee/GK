import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, OAuthProvider } from 'firebase/auth';
import app  from "../../firebase.js";
import axios from 'axios';

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get("code");
    const grant_type = "authorization_code";
    const client_id = "9bf317871a632ce53e33e0928efc4b4a";
    const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";
    const auth = getAuth(app);
    const kakaoProvider = new OAuthProvider('kakao.com');

    // Kakao에서 사용자 정보를 가져옵니다.
    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${REDIRECT_URI}&code=${code}`,
        {},
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        }
      )
      .then(async (res) => {
        const access_token = res.data.access_token;

        axios
          .get('https://kapi.kakao.com/v2/user/me', {
            headers: {
              Authorization: `Bearer ${access_token}`
            }
          })
          .then(async (userRes) => {
            console.log(userRes.data);

            const email = userRes.data.kakao_account.email; // Kakao 사용자 이메일 주소

            // Firebase에서 Kakao 로그인에 사용한 이메일 주소로 로그인 시도
            signInWithEmailAndPassword(auth, email, 'yourPassword')
              .then((userCredential) => {
                // Firebase 사용자가 로그인되었습니다.
                console.log("로그인되었습니다.");
                navigate('/');
              })
              .catch((error) => {
                if (error.code === 'auth/user-not-found') {
                  // Firebase 계정이 없는 경우, 새 계정 생성
                  createUserWithEmailAndPassword(auth, email, 'yourPassword')
                    .then((userCredential) => {
                      // Firebase 사용자가 생성되었습니다.
                      console.log("신규가입 하셨습니다.");
                      navigate('/');
                    })
                    .catch((error) => {
                      console.error("Firebase 사용자 생성 오류:", error);
                      navigate('/');
                    });
                } else {
                  console.error("Firebase 사용자 로그인 오류:", error);
                  navigate('/');
                }
              });
          })
          .catch((error) => {
            console.error("사용자 정보를 가져오는 중 에러 발생:", error);
            navigate('/');
          });
      })
      .catch((error) => {
        console.error("액세스 토큰을 가져오는 중 에러 발생:", error);
        navigate('/');
      });
  }, [navigate]);

  return <></>;
};

export default KakaoCallback;