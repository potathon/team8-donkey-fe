import axios from 'axios';
import React, { useState } from 'react';
import styles from './Signin.module.scss';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/sign-in', {
        username : email,
        password
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // 서버 응답이 성공적일 경우
      if (response.status === 200) {
        // 로그인 성공 후 상태 업데이트 또는 리다이렉트
        window.location.href = '/regist';
      }
    } catch (error) {
      setError('로그인 실패: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <span>logo</span>
      </div>
      <h1 className={styles.title}>로그인</h1>
      <form onSubmit={handleLogin}>
        <div className={styles.form}>
          <div className={styles.inputGroup}>
            <label>아이디</label>
            <input 
              id="email" 
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required/>
          </div>
          <div className={styles.inputGroup}>
            <label>비밀번호</label>
            <input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required />
          </div>
        </div>
        <button type="submit">로그인</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

export default Signin;
