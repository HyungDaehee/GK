import React, { useState } from 'react';
import './signup.scss';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {getFirestore, collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { app }  from '../../firebase.js';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore(app); 

  const signup = async () => {
    try {
      // 사용자 계정 만들기
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // 콘솔에 사용자 정보 출력
      console.log('회원 정보:', {
        uid: result.user.uid,
        name,
        email,
        phone,
      });

      // 추가 사용자 정보 저장
      await addDoc(collection(db, 'userProfiles'), {
        uid: result.user.uid,
        name,
        email,
        phone,
      });

      console.log('사용자 계정이 성공적으로 저장되었음');
    } catch (error) {
      console.error('사용자 계정을 만드는 중 오류가 발생:', error);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    else if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
    else if (name === 'phone') setPhone(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (name && email && password) {
      signup();
      navigate('/Login');
    } else {
      alert('모든 정보를 입력해주세요');
    }
  };

  return (
    <>
      <div className="signup-container">
      <h2>회원 가입</h2>
      <form onSubmit={onSubmit}>
        <div>이름: <input type="text" name="name" onChange={onChange} /></div>
        <div>이메일: <input type="text" name="email" onChange={onChange} /></div>
        <div>비밀번호: <input type="password" name="password" onChange={onChange} /></div>
        <div>전화번호: <input type="number" name="phone" onChange={onChange} /></div>
        <button type="submit">회원 가입</button>
      </form>
    </div>
    </>
  );
};

export default Signup;