const connection = require("../../helpers/database/connectDatabase");

const getUsersDb = () => {
    return new Promise((resolve, reject) => {
        let query = `select * from student order by status;`;
        connection.query(query, function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                reject("userToken not found");
            } else {
                return resolve(result);
            }
        });
    });
}

module.exports =  getUsersDb ;