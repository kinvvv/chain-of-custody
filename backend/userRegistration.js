const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');
const { createContext, CryptoFactory } = require('sawtooth-sdk/signing');
const { Secp256k1PrivateKey } = require('sawtooth-sdk/signing/secp256k1');

const app = express();
app.use(express.json());

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/chainOfCustody', { useNewUrlParser: true, useUnifiedTopology: true });

// 사용자 스키마 정의
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  encryptedPrivateKey: { type: String, required: true },
  publicKey: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

// 키 생성 함수
function generateKeys() {
  const context = createContext('secp256k1');
  const privateKey = context.newRandomPrivateKey();
  const signer = new CryptoFactory(context).newSigner(privateKey);
  return {
    privateKey: privateKey.asHex(),
    publicKey: signer.getPublicKey().asHex()
  };
}

// 개인키 암호화 함수
function encryptPrivateKey(privateKey, password) {
  return CryptoJS.AES.encrypt(privateKey, password).toString();
}

// 회원가입 라우트
app.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // 비밀번호 해싱
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 키 생성
    const { privateKey, publicKey } = generateKeys();

    // 개인키 암호화
    const encryptedPrivateKey = encryptPrivateKey(privateKey, password);

    // 새 사용자 생성
    const newUser = new User({
      username,
      passwordHash,
      email,
      encryptedPrivateKey,
      publicKey
    });

    // 사용자 저장
    await newUser.save();

    res.status(201).json({ message: '사용자가 성공적으로 등록되었습니다.', publicKey });
  } catch (error) {
    console.error('등록 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 서버 시작
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});