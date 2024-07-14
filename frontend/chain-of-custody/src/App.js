// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import logo from './logo.png'; // 로고 이미지 파일을 import
import Login from './login'; // 로그인 화면 컴포넌트 import
import Register from './register'; // 회원가입 화면 컴포넌트 import

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/">
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
          <Link to="/" className="App-title">
            <h1>Blockchain System for<br />Digital Forensic Transaction</h1>
          </Link>
        </header>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <div className="container">
              <Link to="/login">
                <button className="btn left-btn">트랜잭션 등록하기</button>
              </Link>
              <button className="btn right-btn">트랜잭션 조회하기</button>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
