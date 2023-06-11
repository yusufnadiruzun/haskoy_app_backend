const connection = require("../../helpers/database/connectDatabase");
const bcrypt = require("bcryptjs");

const signupdb = (name, phone, mail, password, status, photourl, usertoken) => {
  return new Promise((resolve, reject) => {
    if (status == "personel") {
      let query = `INSERT INTO personel_control(name, phone, mail, password,usertoken, status, photourl) VALUES ('${name}','${phone}','${mail}','${password}','${usertoken}','${status}','${photourl}');`;
      connection.query(query, function (err, result) {
        if (err) throw err;
        resolve(true);
      });
    } else {
      let query = `INSERT INTO student(name, phone, mail, password,usertoken, status, photourl) VALUES ('${name}','${phone}','${mail}','${password}','${usertoken}','${status}','${photourl}');`;
      connection.query(query, function (err, result) {
        if (err) throw reject(err);
        resolve(true);
      });
    }
  });
};

const logindb = (phone, password) => {
  return new Promise((resolve, reject) => {
    console.log(phone, password);
    let query = `SELECT * FROM student WHERE phone='${phone}'`;
    connection.query(query, function (err, result) {
      if (err) throw err;
      if (result.length == 0) {
        console.log("ilkif");

        reject("Kullanıcı adı veya şifre hatalı");
      } else if (!bcrypt.compareSync(password, result[0].password)) {
        console.log(result[0].password);
        console.log("elseif");

        reject("Kullanıcı adı veya şifre hatalı");
      } else {
        console.log("else");
        resolve(result);
      }
      3;
    });
  });
};

const loginTokendb = (usertoken) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM student WHERE usertoken='${usertoken}'`;
    connection.query(query, function (err, result) {
      if (err) throw err;
      if (result.length == 0) {
        reject("Token hatalı");
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  signupdb,
  logindb,
  loginTokendb,
};
