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
       let query = `SELECT permission_name FROM permissions p JOIN userPermission u ON p.permission_id = u.permission_id JOIN user s ON u.user_id = s.user_id WHERE s.usertoken = '${usertoken}';`;

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

const authoriseDb = (user_phone, permission_name) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM user WHERE phone='${user_phone}'`;
    connection.query(query, function (err, result) {
      if (err) throw err;
      if (result.length == 0) {
        reject("userToken not found");
      } else {
        let user_id = result[0].user_id;
        query = `select * from permissions where permission_name = ('${permission_name}');`;
        connection.query(query, function (err, result) {
          if (err) throw err;
          if (result.length == 0) {
            reject("permission_name does not exists");
          } else {
            query = `select * from userPermission where user_id = ('${user_id}') and permission_id = (select permission_id from permissions where permission_name = ('${permission_name}'));`;
            connection.query(query, function (err, result) {
              if (err) throw err;
              if (result.length > 0) {
                reject("permission already exists");
              } else {
                query = `INSERT INTO userPermission (user_id, permission_id) VALUES ('${user_id}', (SELECT permission_id FROM permissions WHERE permission_name='${permission_name}'));`;
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


const deletePermissionDb = (user_phone, permission_name) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM user WHERE phone='${user_phone}'`;
        connection.query(query, function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                reject("phone not found");
            } else {
                let user_id = result[0].user_id;
                query = `DELETE FROM userPermission WHERE user_id='${user_id}' AND permission_id=(SELECT permission_id FROM permissions WHERE permission_name='${permission_name}');`;
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
              reject("no permission founded");

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
