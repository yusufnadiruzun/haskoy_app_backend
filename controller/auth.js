const {
  logindb,
  signupdb,
  loginTokendb,
  deleteUserdb
} = require("../databaseOperations/auth/auth");
const {
  generateUserToken,
  sendJwtToClient,
} = require("../helpers/authorization/sendTokenToClient");
const sendResponse = require("../helpers/response/sendResponse");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const { name,surname, phone, mail, password, role, photourl } = req.body;
  let hashPassword = bcrypt.hashSync(password, 10);
  let usertoken = generateUserToken(phone, password);
  return signupdb(name, surname,phone, mail, hashPassword, role, photourl, usertoken)
    .then((result) => sendJwtToClient(phone,name,surname,usertoken, res))
    .catch((err) => sendResponse(res, "unsuccess", 400, err));
};

const login = async (req, res) => {
  const { phone, password, usertoken } = req.body;

  if (usertoken == "") {
    let usertoken = generateUserToken(phone, password);
   
    logindb(phone, password, usertoken)
      .then((result) => sendJwtToClient(phone,result[0].name,result[0].surname, usertoken, res))
      .catch((err) =>sendResponse(res, "unsuccess", 400, err));
  } else {
    loginTokendb(usertoken)
      .then((result) => sendJwtToClient(result.phone,result.name,result.surname, usertoken, res))
      .catch((err) => sendResponse(res, "unsuccess", 400, err));
  }
};

const deleteUser = async (req,res) => {
  const { phone } = req.body;

    deleteUserdb(phone)
      .then(result => {res.send(result)}).catch(err => {res.send(err)})
      .catch((err) =>sendResponse(res, "unsuccess", 400, err));

};


module.exports = { signup, login, deleteUser};
