const connection = require("../../helpers/database/connectDatabase");
const bcrypt = require("bcryptjs");

const permissionControldb = (usertoken) => {
  return new Promise((resolve, reject) => {
    // let query = `select * from personel;`;
    // connection.query(query, function (err, result) {
    //   if (err) throw err;
    //   if (result.length == 1) {
    //     reject("userToken not found");
    //   } else {
    //     for (let i = 0; i < result.length; i++) {
    //       if (usertoken == result[i].usertoken) {
    //         return resolve(result[i]);
    //       }
    //     }
       let query = `SELECT permission_name FROM permissions p JOIN userPermission u ON p.permission_id = u.permission_id JOIN student s ON u.student_id = s.student_id WHERE s.usertoken = '${usertoken}';`;

        connection.query(query, function (err, result) {
          if (err) throw err;
          if (result.length == 0) {
            reject([]);
          } else {
            return resolve(result);
          }
          reject("error");
        });
      });
    }
    // );
  // });
// };

const authoriseDb = (student_phone, permission_name) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM student WHERE phone='${student_phone}'`;
    connection.query(query, function (err, result) {
      if (err) throw err;
      if (result.length == 0) {
        reject("userToken not found");
      } else {
        let student_id = result[0].student_id;
        query = `select * from permissions where permission_name = ('${permission_name}');`;
        connection.query(query, function (err, result) {
          if (err) throw err;
          if (result.length == 0) {
            reject("permission_name does not exists");
          } else {
            query = `select * from userPermission where student_id = ('${student_id}') and permission_id = (select permission_id from permissions where permission_name = ('${permission_name}'));`;
            connection.query(query, function (err, result) {
              if (err) throw err;
              if (result.length > 0) {
                reject("permission already exists");
              } else {
                query = `INSERT INTO userPermission (student_id, permission_id) VALUES ('${student_id}', (SELECT permission_id FROM permissions WHERE permission_name='${permission_name}'));`;
                connection.query(query, function (err, result) {
                  if (err) throw err;
                  resolve(true); // Resolve the promise with 'true'
                });
              }
            });
          }
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

// PERMISSION OPERATIONS -----------

const getAllPermissionDB = () =>{
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM permissions`;
    connection.query(query, function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
          if (err) throw err;
          return resolve(result);
        } else {
              reject("permission already added");

        }
    });
});
}

const addPermissionDB = (permission_name) =>{
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM permissions WHERE permission_name='${permission_name}'`;
    connection.query(query, function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            reject("permission already added");
        } else {
            query = `INSERT INTO permissions ( permission_name) VALUES ('${permission_name}');`;
            connection.query(query, function (err, result) {
                if (err) throw err;
                return resolve(true);
                reject("hataa");
            });
        }
    });
});
}

module.exports = {permissionControldb, authoriseDb,deletePermissionDb,addPermissionDB, getAllPermissionDB};
