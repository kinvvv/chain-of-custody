// src/Login.js
import React from 'react';
import './login.css';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="Login">
      <div className="login-container">
        <h2>로그인</h2>
        <form>
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input type="text" id="id" name="id" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="login-btn">로그인</button>
        </form>
        <Link to="/register" className="register-link">등록하기</Link>
      </div>
    </div>
  );
}

export default Login;
