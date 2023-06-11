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

const sendJwtToClient = (phone,userToken ,res) => {

  const { JWT_EXPIRE, NODE_ENV } = process.env;
  const jwtToken = generateJwsFromUser(phone);
    
  return res
  .status(200)
    .cookie("jwt", jwtToken, {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(JWT_EXPIRE) * 1000 * 60),
      secure: NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      jwt_token: jwtToken,
      userToken: userToken,
    });
};

module.exports = {
    sendJwtToClient,
    generateUserToken};
