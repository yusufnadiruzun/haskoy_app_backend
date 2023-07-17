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
                query = `SELECT permission_name FROM permissions p JOIN userpermission u ON p.permission_id = u.permission_id JOIN student s ON u.student_id = s.student_id WHERE s.usertoken = '${usertoken}';`;
                
                connection.query(query, function (err, result) {
                    if (err) throw err;
                    if (result.length == 0) {
                        reject("userToken not found");
                    } else {
                        return resolve(result);  
                    }
                    reject("userToken not found");
                })
            }
        });
    });
}

module.exports = permissionControldb;