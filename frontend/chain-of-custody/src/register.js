import React, { useState } from 'react';
import './register.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    email: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // 비밀번호 일치 여부 실시간 체크
    if (name === 'confirmPassword' || name === 'password') {
      if (name === 'confirmPassword' && value !== formData.password) {
        setErrorMessage('비밀번호가 일치하지 않습니다.');
      } else if (name === 'password' && value !== formData.confirmPassword && formData.confirmPassword) {
        setErrorMessage('비밀번호가 일치하지 않습니다.');
      } else {
        setErrorMessage('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!validateEmail(formData.email)) {
      setErrorMessage('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/register', {
        id: formData.id,
        password: formData.password,
        email: formData.email
      });
      console.log('서버 응답:', response.data);
      // 여기에 등록 성공 후 처리를 추가할 수 있습니다 (예: 로그인 페이지로 리다이렉트)
    } catch (error) {
      console.error('등록 오류:', error.response.data);
      setErrorMessage(error.response.data.message || '등록 중 오류가 발생했습니다.');
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="Register">
      <div className="register-container">
        <h2>등록하기</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input 
              type="text" 
              id="id" 
              name="id" 
              value={formData.id} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              required 
            />
            {errorMessage && formData.confirmPassword && (
              <p className="error-message">{errorMessage}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">이메일 주소</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit" className="register-btn">등록하기</button>
        </form>
        <Link to="/login" className="login-link">로그인 화면으로 돌아가기</Link>
      </div>
    </div>
  );
}

export default Register;