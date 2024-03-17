const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 2222;

/* 데이터 베이스 */
const db = require('./db.json');

/* 기본 설정 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.post('/login', (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: 'Form 이 비어있어요' });
  }

  const { userId, password } = req.body;
  const user = db[userId];
  if (!user) {
    res.status(400).send({ message: '아이디를 확인해주세요' });
    return;
  }

  if (user['password'] !== password) {
    res.status(400).send({ message: '비밀번호를 확인해주세요' });
    return;
  }
  const cookieOption = { sameSite: 'Lax' };

  res.cookie('userId', userId, cookieOption);
  res.cookie('password', password, cookieOption);
  res.status(200).send({ message: 'good' });
});

app.get('/Mypage/:userId', (req, res) => {
  const { cookies, params } = req;
  const { userId, password } = cookies;
  const requestUserId = params.userId;
  const user = db[requestUserId];

  if (userId !== requestUserId) {
    res
      .status(404)
      .send({ message: '마이페이지에서는 해당 계정에 로그인 해야 합니다' });
    return;
  }

  if (password !== user.password) {
    res.status(404).send({ message: '마이페이지 접근할 권한이 없습니다' });
    return;
  }

  res.status(200).json(user.information);
});
