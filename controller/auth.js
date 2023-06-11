const { logindb, signupdb,loginTokendb } = require("../databaseOperations/auth/auth");
const {generateUserToken,sendJwtToClient} = require("../helpers/authorization/sendTokenToClient");
const sendResponse = require("../helpers/response/sendResponse");
const bcrypt = require("bcryptjs");


const signup = async (req, res) => {
    
  const { name, phone, mail, password, status, photourl } = req.body;
  let hashPassword = bcrypt.hashSync(password, 10);
  let usertoken =generateUserToken(phone, password);
  return signupdb(name, phone, mail, hashPassword, status, photourl,usertoken)
    .then((result) => sendJwtToClient(phone,usertoken , res))
    .catch((err) =>  console.log(err));
};

const login = async (req, res) => {

  const { phone, password, usertoken } = req.body;

  if(usertoken == undefined){
  let usertoken =generateUserToken(phone, password);
  logindb(phone, password)
    .then((result) => sendJwtToClient(phone,usertoken, res))
    .catch((err) => sendResponse(res, false, 400, err));
  }
  else{
    loginTokendb(usertoken)
    .then((result) => sendJwtToClient(result[0].phone, usertoken, res))
    .catch((err) => sendResponse(res, false, 400, err));
  } 
};


module.exports = { signup,login };
