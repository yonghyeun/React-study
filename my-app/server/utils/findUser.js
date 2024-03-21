const users = require('../db');

const findUser = (req) => {
  const requestId = req.body.userId || req.params.userId;
  const requestPassword = req.body.password || req.params.password;

  const user = users.find(({ userId, password }) => {
    return userId === requestId && password === requestPassword;
  });

  if (!user) throw Error('아이디나 비밀번호를 확인해주세요');
  return user;
};

module.exports = findUser;
