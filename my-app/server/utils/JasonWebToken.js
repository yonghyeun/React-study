const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECERTE_KEY = process.env.SECERTE_KEY;

const createAccessToken = (user) => {
  const payloader = {
    // 토큰과 관련된 정보
    userId: user.userId,
  };
  const secretKey = SECERTE_KEY; // 토큰 인코딩 시 사용할 시크릿 키
  const options = { expiresIn: '1h' }; // 토큰의 option
  const token = jwt.sign(payloader, secretKey, options);
  return token;
};

const verifyToken = (token) => {
  let decoded = null;
  try {
    decoded = jwt.verify(token, SECERTE_KEY);
    /*
    decoded = { userId: 'user1', iat: 1710940155, exp: 1710943755 }
    payloader 로 설정한 값과 기본 payloader 정보들인 issuedAt , expiresIn 등의 정보가
    담겨있다.
    */
    return {
      type: true,
      payload: decoded,
    };
  } catch (e) {
    throw Error(e.message);
  }
};

module.exports = {
  createAccessToken,
  verifyToken,
};
