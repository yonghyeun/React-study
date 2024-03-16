const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 2222;

/* 데이터 베이스 */
const db = require('./db.json');

/* 기본 설정 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.post('/login', (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: 'Form 이 비어있어요' });
  }

  // TODO database 에서 조회하고 존재하지 않을 경우 에러 상태코드 보내기
  const { userId, password } = req.body;

  if (!db.userId) {
    res.status(400).send({ message: '아이디를 확인해주세요' });
    return;
  }

  if (db.uuserId !== password) {
    res.status(400).send({ message: '비밀번호를 확인해주세요' });
    return;
  }
  // TODO 쿠키 설정해서 보내기
  res.status(200).send({ message: 'good' });
});
