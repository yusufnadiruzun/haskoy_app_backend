const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateJwsFromUser = (name) => {
  const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;
  let payload = {
    id: 1,
    name: name,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRE });
  return token;
};

const generateUserToken = (phone, password) => {
    return bcrypt.hashSync(phone + password, 10);     
};

const sendJwtToClient = (phone,name,userToken ,res) => {
  console.log(phone,name,userToken)
    
  return res.status(200).json({
      success: true,
      name: name,
      surname: surname,
      phone: phone,
      userToken: userToken,
    });
};

module.exports = {
    sendJwtToClient,
    generateUserToken};
