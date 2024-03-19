const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const findUser = require('./utils/findUser');
const fileStore = require('session-file-store')(session);

const app = express();
const PORT = 8888;

require('dotenv').config();

// 기본 설정
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  session({
    secure: false, // session 을 주고 받을 환경에 대한 설정
    secret: process.env.SECRET_KEY,
    resave: false, // 세션을 언제나 저장할지
    saveUninitialized: true, // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정
    cookie: {
      // 세션 정보를 주고 받을 쿠키 정보 설정
      httpOnly: true,
      secure: false,
      maxAge: 60000,
    },
    name: 'session-cookie', // 브라우저 메모리에 sessionId 를 저장할 프로퍼티 명
    store: new fileStore(), // 세션 객체에 세션 스토어 적용
  }),
);
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});

app.get('/', (req, res) => {
  if (!req.session.num) req.session.num = 1;
  else req.session.num += 1;

  console.log(`${req.session.num} 번째 방문`);

  res.status(200).send('hi');
});

app.post('/login', (req, res) => {
  const requestId = req.body.userId || req.params.userId;
  const requestPassword = req.body.password || req.paarams.password;
  const userFinded = findUser(requestId, requestPassword); // Form 데이터로 로그인 정보를 확인

  if (req.session.user) {
    res.status(200).send(JSON.stringify(userFinded));
    return;
  }

  if (userFinded) {
    console.log(`로그인 전 세션 아이디 : ${req.sessionID}`);
    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).send({ message: 'Session regenerate failed' });
      }
      req.session.user = userFinded;
      res.status(200).send(JSON.stringify(userFinded));
      console.log(`로그인 후 세션 아이디 :${req.sessionID}`);
    });
  } else {
    res.status(400).send({ message: '아이디나 비밀번호를 다시 확인하세요' });
  }
});

app.get('/content/:contentId', (req, res) => {
  console.log(req);
  const { params } = req;

  res.status(200).send(
    JSON.stringify({
      title: `${params.contentId} 의 제목입니다`,
      text: `${params.contentId} 의 글 내용입니다`,
    }),
  );
});

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;

    res.clearCookie('session-cookie');
    res.status(200).send({ message: '로그아웃 잘됐음' });
    console.log(`----- ${req.sessionID} 로그아웃 -----`);
  });
});
