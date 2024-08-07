const connection = require("../../helpers/database/connectDatabase");
const bcrypt = require("bcryptjs");

const signupdb = (
  name,
  surname,
  phone,
  mail,
  password,
  level,
  photourl,
  usertoken
) => {
  return new Promise((resolve, reject) => {
    if (status == "personel") {
      let query = `select * from personel_control where phone = ('${phone}');`;
      connection.query(query, function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
          reject("phone already exists");
        } else {
          query = `INSERT INTO personel_control(name,surname, phone, mail, password,usertoken, status, photourl) VALUES ('${name}','${surname}','${phone}','${mail}','${password}','${usertoken}','${status}','${photourl}');`;
          connection.query(query, function (err, result) {
            if (err) throw err;
            resolve(true);
          });
        }
      });
    } else {
      let query = `select * from student where phone = ('${phone}');`;
      connection.query(query, function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
          reject("phone already exists");
        } else {
          query = `INSERT INTO student(name, surname,phone, mail, password,usertoken, level, photourl) VALUES ('${name}','${surname}','${phone}','${mail}','${password}','${usertoken}','${level}','${photourl}');`;
          connection.query(query, function (err, result) {
            if (err) throw err;
            resolve(true);
          });
        }
      });
    }
  });
};

// const personelControl = (phone) => {
//   return new Promise((resolve, reject) => {

// }

const logindb = (phone, password,userToken) => {
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
        query = `UPDATE student SET usertoken = '${userToken}' WHERE phone = '${phone}'`;
        connection.query(query, function (err, result) {
          if (err) console.log(err, "hata");
          
      })
      resolve(result);  
      }
    });
  });
};

const loginTokendb = (usertoken) => {
  return new Promise((resolve, reject) => {
    let query = `select usertoken from student `;
    connection.query(query, function (err, result) {
      if (err) throw err;
      if (result.length == 0) {
        reject("userToken not found ilk ");
      } else {
        console.log(result)
        for (let i = 0; i < result.length; i++) {
         //if(bcrypt.compareSync(usertoken, result[i].usertoken)){ BU KOD DOGRU CALISMIYOR
           if (usertoken == result[i].usertoken) {
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
