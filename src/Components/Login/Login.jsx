import React, { useState, useEffect } from 'react';
import './login.scss';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
 import { useNavigate } from 'react-router-dom';
 import { app} from '../../firebase.js';
 import kakaologinoimg from '../img/kakao_login.png';

const Login = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignup, setIsSigup] = useState(true);
    const [isLoggined, setIsLoggined] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth(app);

    const CLIENT_ID = "9bf317871a632ce53e33e0928efc4b4a";
    const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";
   
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`
    const handleLogin = ()=>{
        window.location.href = kakaoURL
    }

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
           if(user){
            setIsLoggined(true);
           }else{
            setIsLoggined(false);
           }
        })
    }, [])


    const signin = async ()=>{
        const result = await signInWithEmailAndPassword(auth, email, password);
        console.log(result)
    }




    const onChage = (e) => {
        const {name, value} = e.target;
        if(name === "email") setEmail(value);
        else setPassword(value);
    }


    const onSubmit = async(e) =>{
        e.preventDefault();
        
        if(isSignup){
            signin();
        } else{
            
        }
        navigate("/")
    }
    
    return (
        <div className="login-container">
          <h2>로그인 하세요</h2>
          <form className="login-form" onSubmit={onSubmit}>
            <div className="input-field">
              ID : <input type="text" name="email" onChange={onChage} />
            </div>
            <div className="input-field">
              Password : <input type="password" name="password" onChange={onChage} />
            </div>
            <button className="login-button">{isSignup ? "로그인" : "회원가입"}</button>
          </form>
          <p>아직 계정이 없으신가요?</p>
          <a href='/Signup' className="signup-link">
            <button>회원가입 하러가기</button>
          </a>
          <button onClick={handleLogin} className="kakao-login-button">
  <img src={kakaologinoimg} alt="카카오 로그인" />
</button>
        </div>
      );
    }

export default Login