const connection = require("../../helpers/database/connectDatabase");
const bcrypt = require("bcryptjs");

const permissionControldb = (usertoken) => {
  return new Promise((resolve, reject) => {
    let query = `select * from personel`;
    connection.query(query, function (err, result) {
      if (err) throw err;
      if (result.length == 1) {
        reject("userToken not found");
      } else {
        for (let i = 0; i < result.length; i++) {
          if (usertoken == result[i].usertoken) {
            return resolve(result[i]);
          }
        }
        query = `SELECT permission_name FROM permissions p JOIN userPermission u ON p.permission_id = u.permission_id JOIN student s ON u.student_id = s.student_id WHERE s.usertoken = '${usertoken}';`;

        connection.query(query, function (err, result) {
          if (err) throw err;
          if (result.length == 0) {
            reject("yetki bulunamadı");
          } else {
            return resolve(result);
          }
          reject("hata");
        });
      }
    });
  });
};

const authoriseDb = (student_phone, permission_name) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM student WHERE phone='${student_phone}'`;
    connection.query(query, function (err, result) {
      if (err) throw err;
      if (result.length == 0) {
        reject("userToken not found");
      } else {
        let student_id = result[0].student_id;
        query = `INSERT INTO userPermission (student_id, permission_id) VALUES ('${student_id}', (SELECT permission_id FROM permissions WHERE permission_name='${permission_name}'));`;
        connection.query(query, function (err, result) {
          if (err) throw err;
          return resolve(true);
          reject("hata");
        });
      }
    });
  });
};

const deletePermissionDb = (student_phone, permission_name) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM student WHERE phone='${student_phone}'`;
        connection.query(query, function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                reject("phone not found");
            } else {
                let student_id = result[0].student_id;
                query = `DELETE FROM userPermission WHERE student_id='${student_id}' AND permission_id=(SELECT permission_id FROM permissions WHERE permission_name='${permission_name}');`;
                connection.query(query, function (err, result) {
                    if (err) throw err;
                    return resolve(true);
                    reject("hata");
                });
            }
        });
    });
};


module.exports = {permissionControldb, authoriseDb,deletePermissionDb};
