const connection = require("../../helpers/database/connectDatabase");

const createInspectionDb = (inspection_name) => {
  return new Promise((resolve, reject) => {
    let query = `select * from inspection_type where inspection_name = ('${inspection_name}');`;
    connection.query(query, function (err, result) {
      if (err) throw err;
      if (result.length == 1) {
        reject("inspection_name already exists");
      } else {
        query = `INSERT INTO inspection_type(inspection_name) VALUES ('${inspection_name}');`;
        connection.query(query, function (err, result) {
          if (err) console.log(err) ;
          return resolve(true);
          reject("hata");
        });
      }
    });
  });
};

module.exports = { createInspectionDb };
