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

const addInspectionDb = (inspection_name, student_phone,status) => {
  let student_id = "";
  let inspection_type_id = "";

  return new Promise((resolve, reject) => {
    let query = `select * from inspection_type where inspection_name = ('${inspection_name}');`;
    connection.query(query, function (err, result) {
      if (err) throw err;
      if (result.length == 0) {
        reject("inspection_name does not exists");
      } else {
        inspection_type_id = result[0].inspection_type_id;
        query = `select * from student where phone = ('${student_phone}');`;
        connection.query(query, function (err, result) {
          if (err) throw err;
          if (result.length == 0) {
            reject("phone does not exists");
          } else {
            student_id = result[0].student_id;
            query = `select * from inspection where inspection_type_id = ('${inspection_type_id}') and student_id = ('${student_id}');`; // STATUS GUNCELLEME EKLENECEK !!!!!!!
            connection.query(query, function (err, result) {
              if (err) throw err;
              if (result.length == 1) {
                query = `UPDATE inspection SET status = '${status}' WHERE inspection_type_id = ('${inspection_type_id}') and student_id = ('${student_id}');`;
                resolve("updated inspection");
              } else {
                query = `INSERT INTO inspection(inspection_type_id, student_id,date,status) VALUES ('${inspection_type_id}', '${student_id}','${new Date().getDate() +""+ (new Date().getMonth()+1)  +""+new Date().getFullYear()}','${status}');`;
                connection.query(query, function (err, result) {
                  if (err) throw err;
                  return resolve(true);
                  reject("hata");
                });

              }
            });
          }
        });
      }
    });
  });
};

const deleteInspectionDb = (inspection_name, student_phone,date) => {
  let student_id = "";
  let inspection_type_id = "";
  return new Promise((resolve, reject) => {
  let query = `select * from inspection_type where inspection_name = ('${inspection_name}');`;
  connection.query(query, function (err, result) {
    if (err) throw err;
    if (result.length == 0) {
      reject("inspection_name does not exists");
    } else {
      inspection_type_id = result[0].inspection_type_id;
      query = `select * from student where phone = ('${student_phone}');`;
      connection.query(query, function (err, result) {
        if (err) throw err;
        if (result.length == 0) {
          reject("phone does not exists");
        } else {
          student_id = result[0].student_id;
          query = `select * from inspection where inspection_type_id = ('${inspection_type_id}') and student_id = ('${student_id}') and date = '${date}';`;
          connection.query(query, function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
              reject("inspection does not exists");
            } else {
              query = `DELETE FROM inspection WHERE inspection_type_id = ('${inspection_type_id}') and student_id = ('${student_id}');`;
              connection.query(query, function (err, result) {
                if (err) throw err;
                return resolve(true);
                reject("hata");
              });
            }
          });
        }
      });
    }
  });
});
};







module.exports = { createInspectionDb,addInspectionDb,deleteInspectionDb };
