const users = require('../db');

const findUser = (requestId, requestPassword) => {
  const user = users.find(({ userId, password }) => {
    return userId === requestId && password === requestPassword;
  });
  return user;
};

module.exports = findUser;
