const connection = require("../../helpers/database/connectDatabase");
const TodayDate = require("../../helpers/Methods/DateFormater");

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
          if (err) console.log(err);
          addInspectionToAllStudent(inspection_name).then((res) => console.log(res)).catch((err) => console.log(err));
          return resolve(true);
          reject("hata");
        });
      }
    });
  });
};

const addInspectionToAllStudent = (inspection_name, date) => {
  return new Promise((resolve, reject) => {
    let query = `select * from inspection_type where inspection_name = ('${inspection_name}');`;
    connection.query(query, function (err, result) {
      if (err) throw err;
      if (result.length == 0) {
        reject("inspection_name does not exist");
      } else {
        inspection_type_id = result[0].inspection_type_id;
        query = `select user_id from user;`;
        connection.query(query, function (err, result) {
          if (err) throw err;
          if (result.length > 0) {
            result.forEach((element) => {
              
              query = `INSERT INTO inspection(inspection_type_id, user_id, date, status) VALUES ('${inspection_type_id}', '${element.user_id}', '${TodayDate()}', 'yok');`;
              connection.query(query, function (err, result) {
                if (err) throw err;
                
              });
            });
            return resolve("Yoklama eklendi");
          }
        });
        /*
        
        query = `INSERT INTO inspection(inspection_type_id, student_id, date, status) VALUES ('${inspection_type_id}', '${student_id}', '${TodayDate()}', '${status}');`;
        connection.query(query, function (err, result) {
          if (err) throw err;
          return resolve("Yoklama eklendi");
        });
        */
      }
    });
  });
};

const addInspectionDb = (inspection_name, user_phone, status) => {
  
  let user_id = "";
  let inspection_type_id = "";

  return new Promise((resolve, reject) => {
    let query = `select * from inspection_type where inspection_name = ('${inspection_name}');`;
    connection.query(query, function (err, result) {
      if (err) throw err;
      if (result.length == 0) {
        reject("inspection_name does not exist");
      } else {
        inspection_type_id = result[0].inspection_type_id;
        query = `select * from user where phone = ('${user_phone}');`;
        connection.query(query, function (err, result) {
          if (err) throw err;
          if (result.length == 0) {
            reject("phone does not exist");
          } else {
            user_id = result[0].user_id;

            query = `select * from inspection where inspection_type_id = '${inspection_type_id}' and user_id = '${user_id}' and date = '${TodayDate()}';`;
            connection.query(query, function (err, result) {
              if (err) throw err;

              if (result.length > 0) {
                // Mevcut ise status güncelleme işlemi
                query = `UPDATE inspection SET status = '${status}' WHERE inspection_type_id = '${inspection_type_id}' AND user_id = '${user_id}' AND date = '${TodayDate()}';`;
                connection.query(query, function (err, result) {
                  if (err) throw err;
                  return resolve("Yoklama güncellendi");
                });
              } else {
                // Yoklama mevcut değilse yeni bir kayıt ekleme işlemi
                query = `INSERT INTO inspection(inspection_type_id, user_id, date, status) VALUES ('${inspection_type_id}', '${user_id}', '${TodayDate()}', '${status}');`;
                connection.query(query, function (err, result) {
                  if (err) throw err;
                  return resolve("Yoklama eklendi");
                });
              }
            });
          }
        });
      }
    });
  });
};

/*
const addInspectionDb = (inspection_name, student_phone, status) => {
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

            query = `select * from inspection where inspection_type_id = '${inspection_type_id}' and student_id = '${student_id}' and date = '${TodayDate()}';`; // STATUS GUNCELLEME EKLENECEK !!!!!!!
            connection.query(query, function (err, result) {
              if (err) throw err;

              if (result.length > 0) {
                reject("mevcut");
              } else {
                query = `INSERT INTO inspection(inspection_type_id, student_id,date,status) VALUES ('${inspection_type_id}', '${student_id}','${TodayDate()}','${status}');`;
                connection.query(query, function (err, result) {
                  if (err) throw err;
                  return resolve(true);
                });
              }
            });
          }
        });
      }
    });
  });
};
*/

const deleteInspectionDb = (inspection_name, user_phone, date) => {
  let user_id = "";
  let inspection_type_id = "";
  return new Promise((resolve, reject) => {
    let query = `select * from inspection_type where inspection_name = ('${inspection_name}');`;
    connection.query(query, function (err, result) {
      if (err) throw err;
      if (result.length == 0) {
        reject("inspection_name does not exists");
      } else {
        inspection_type_id = result[0].inspection_type_id;
        query = `select * from user where phone = ('${user_phone}');`;
        connection.query(query, function (err, result) {
          if (err) throw err;
          if (result.length == 0) {
            reject("phone does not exists");
          } else {
            user_id = result[0].user_id;
            query = `select * from inspection where inspection_type_id = ('${inspection_type_id}') and user_id = ('${user_id}') and date = '${date}';`;
            connection.query(query, function (err, result) {
              if (err) throw err;
              if (result.length == 0) {
                reject("inspection does not exists");
              } else {
                query = `DELETE FROM inspection WHERE inspection_type_id = ('${inspection_type_id}') and user_id = ('${user_id}');`;
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

const getAllInspectionDb = () => {
  return new Promise((resolve, reject) => {
    let query = `SELECT 
    i.date,
    it.inspection_name AS inspection_name,
    COUNT(*) AS participant_count
FROM inspection AS i
JOIN inspection_type AS it ON i.inspection_type_id = it.inspection_type_id
WHERE i.date < CURDATE()  -- Sadece geçmiş tarihlerdeki yoklamaları listelemek istiyorsanız
GROUP BY i.date, i.inspection_type_id, it.inspection_name
ORDER BY i.date;
`;
    connection.query(query, function (err, result) {
      if (err) throw err;
      if (result.length == 0) {
        reject("inspection not found");
      } else {
        return resolve(result);
      }
    });
  });
};

const getInspectionNameDb = () => {
  return new Promise((resolve, reject) => {
    let query = `select * from inspection_type;`;
    connection.query(query, function (err, result) {
      if (err) throw err;
      if (result.length == 0) {
        reject("inspection_name not found");
      } else {
        return resolve(result);
      }
    });
  });
};

const addInspectionBarcodDb = (date, phone, inspection_name) => {
  // barcod controlü yap
  return new Promise((resolve, reject) => {
    if (date == TodayDate()) {
      addInspectionDb(inspection_name, phone, "var")
        .then((result) => resolve(result))
        .catch((err) => {
          reject(err);
        });
    } else {
      resolve("wrong date match");
    }
  });
};

const getInspectionDb = (inspection_name, date) => {
  return new Promise((resolve, reject) => {
    let query = `select name,surname,phone,role,status from inspection JOIN user on inspection.user_id = user.user_id JOIN inspection_type on inspection_type.inspection_type_id = inspection.inspection_type_id where date='${date}' and inspection_type.inspection_name ='${inspection_name}'`;
    connection.query(query, function (err, result) {
      if (err) throw err;

      if (result.length == 0) {
        reject("empty data");
      } else {
        return resolve(result);
      }
    });
  });
};

const updateInspectionDb = (inspection_name, date, user_phone, status) => {
  return new Promise((resolve, reject) => {
    let query = `UPDATE inspection y
JOIN user s ON y.user_id = s.user_id
JOIN inspection_type yt ON y.inspection_type_id = yt.inspection_type_id
SET y.status = '${status}'
WHERE s.phone = '${user_phone}'
AND yt.inspection_name = '${inspection_name}'
AND y.date = '${date}';
`;
    connection.query(query, function (err, result) {
      if (err) throw err;
      if (result.affectedRows == 0) {
        reject("no row affected");
      } else {
        resolve("updated");
      }
    });
  });
};

const getStudentInspectionDb = (user_phone) => {
  return new Promise((resolve, reject) => {
    let query = `
  SELECT
    name,
    surname,
    phone,
    inspection_name,
    date,
    status
  FROM
    inspection
    JOIN user ON inspection.user_id = user.user_id
    JOIN inspection_type ON inspection_type.inspection_type_id = inspection.inspection_type_id
  WHERE
    phone = '${user_phone}'
  ORDER BY
    date DESC; -- Tarihe göre azalan sıralama (en yeni önce)
`;

    connection.query(query, function (err, result) {
      if (err) throw err;

      if (result.length == 0) {
        reject("empty data");
      } else {
        return resolve(result);
      }
    });
  });
};
module.exports = {
  getStudentInspectionDb,
  createInspectionDb,
  addInspectionDb,
  deleteInspectionDb,
  addInspectionBarcodDb,
  getAllInspectionDb,
  getInspectionNameDb,
  getInspectionDb,
  updateInspectionDb,
};
