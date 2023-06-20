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
        if (err) throw err;
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
        reject("Kullanıcı adı veya şifre hatalı");
      } else if (!bcrypt.compareSync(password, result[0].password)) {
        reject("Kullanıcı adı veya şifre hatalı");
      } else {
        resolve(result);
      }
      
    });
  });
};
const loginTokendb = (usertoken) => {
  return new Promise((resolve, reject) => {
    console.log(usertoken);
    let query = `select * from student`;
    connection.query(query, function (err, result) {
      if (err) throw err;
      if (result.length == 0) {
        reject("userToken not found");
      } else {
        console.log(result[0])
        for (let i = 0; i < result.length; i++) {
          if (usertoken==result[i].usertoken) {
            console.log("iicciiif")
            return resolve(result[i]);
          }
        }
        reject("userToken not found");
      }
    });
  });
};

module.exports = {
  signupdb,
  logindb,
  loginTokendb,
};
