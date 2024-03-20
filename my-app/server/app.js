/* JWT 사용법 버전  */

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const findUser = require('./utils/findUser');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 8888;
const { createAccessToken, verifyToken } = require('./utils/JasonWebToken');
const db = require('./db');

// 기본 설정
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});

app.get('/', (req, res) => {
  if (!req.session.num) req.session.num = 1;
  else req.session.num += 1;

  console.log(`${req.session.num} 번째 방문`);

  res.status(200).send(JSON.stringify('hi~!'));
});

app.get('/content/:contentId', (req, res) => {
  const { params } = req;

  res.status(200).send(
    JSON.stringify({
      title: `${params.contentId} 의 제목입니다`,
      text: `${params.contentId} 의 글 내용입니다`,
    }),
  );
});

app.post('/login', (req, res) => {
  try {
    const user = findUser(req);
    const AccessToken = createAccessToken(user);
    res.cookie('accessToken', AccessToken, {
      httpOnly: true,
      secure: false,
    });
    res.status(200).json({ userId: user.userId });
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
});

app.post('/logout', (req, res) => {
  res.clearCookie('accessToken');
  res.status(200).send('쿠키 삭제 완료~! ');
});

app.get('/Mypage', (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const verifyResult = verifyToken(token); // token 유효성 검증
    const userInfo = db.find(
      // 유효성 검증 후 DB 조회
      (user) => user.userId === verifyResult.payload.userId,
    );
    res.status(200).json(userInfo);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

app.get('/login/token', (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const verifyResult = verifyToken(token);
    res.status(200).json({ userId: verifyResult.payload.userId });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});
