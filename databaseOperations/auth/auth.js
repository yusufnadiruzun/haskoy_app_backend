const connection = require("../../helpers/database/connectDatabase");
const bcrypt = require("bcryptjs");

const signupdb = (
  name,
  surname,
  phone,
  mail,
  password,
  role,
  photourl,
  usertoken
) => {
  return new Promise((resolve, reject) => {
    if (role == "personel") {
      let query = `select * from personel_control where phone = ('${phone}');`;
      connection.query(query, function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
          reject("phone already exists");
        } else {
          query = `INSERT INTO personel_control(name,surname, phone, mail, password,usertoken, role, photourl) VALUES ('${name}','${surname}','${phone}','${mail}','${password}','${usertoken}','${role}','${photourl}');`;
          connection.query(query, function (err, result) {
            if (err) throw err;
            resolve(true);
          });
        }
      });
    } else {
      let query = `select * from user where phone = ('${phone}');`;
      connection.query(query, function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
          reject("phone already exists");
        } else {
          query = `INSERT INTO user(name, surname,phone, mail, password,usertoken, role, photourl) VALUES ('${name}','${surname}','${phone}','${mail}','${password}','${usertoken}','${role}','${photourl}');`;
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

const logindb = (phone, password, userToken) => {
  return new Promise((resolve, reject) => {
    console.log(phone, password);
    let query = `SELECT * FROM user WHERE phone='${phone}'`;

    connection.query(query, function (err, result) {
      if (err) throw err;
      if (result.length == 0) {
        reject("Kullanıcı adı veya şifre hatalı");
      } else if (!bcrypt.compareSync(password, result[0].password)) {
        reject("Kullanıcı adı veya şifre hatalı");
      } else {
        query = `UPDATE user SET usertoken = '${userToken}' WHERE phone = '${phone}'`;
        connection.query(query, function (err, result) {
          if (err) console.log(err, "hata");
        });
        resolve(result);
      }
    });
  });
};

const loginTokendb = (usertoken) => {
  return new Promise((resolve, reject) => {
    let query = `select * from user `;
    connection.query(query, function (err, result) {
      if (err) throw err;
      if (result.length == 0) {
        reject("userToken not found ilk ");
      } else {
        console.log(result);
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

const deleteUserdb = (phone) => {
  return new Promise((resolve, reject) => {
    connection.beginTransaction((err) => {
      if (err) return reject(err);

      // 1. Telefon numarasına göre user_id'yi bul
      const getUserIdQuery = "SELECT user_id FROM user WHERE phone = ?";
      connection.query(getUserIdQuery, [phone], (err, results) => {
        if (err) {
          return connection.rollback(() => reject(err));
        }

        if (results.length === 0) {
          return connection.rollback(() => reject("Kullanıcı bulunamadı."));
        }

        const userId = results[0].user_id;

        // 2. StudyTrack tablosundan user_id'ye bağlı kayıtları sil
        const deleteStudyTrack = "DELETE FROM StudyTrack WHERE user_id = ?";
        connection.query(deleteStudyTrack, [userId], (err) => {
          if (err) return connection.rollback(() => reject(err));

          // 3. QuestionTrack tablosundan user_id'ye bağlı kayıtları sil
          const deleteQuestionTrack =
            "DELETE FROM StudyTrack WHERE user_id = ?";
          connection.query(deleteQuestionTrack, [userId], (err) => {
            if (err) return connection.rollback(() => reject(err));
/*
            // 4. Homework tablosundan user_id'ye bağlı kayıtları sil
            const deleteHomework = "DELETE FROM Homework WHERE user_id = ?";
            connection.query(deleteHomework, [userId], (err) => {
              if (err) return connection.rollback(() => reject(err));
*/
              // 5. KullanıcıYetkileri tablosundan user_id'ye bağlı kayıtları sil
              const deleteUserPermissions =
                "DELETE FROM userPermission WHERE user_id = ?";
              connection.query(deleteUserPermissions, [userId], (err) => {
                if (err) return connection.rollback(() => reject(err));

                // 6. Yoklama tablosundan user_id'ye bağlı kayıtları sil
                const deleteAttendance =
                  "DELETE FROM inspection WHERE user_id = ?";
                connection.query(deleteAttendance, [userId], (err) => {
                  if (err) return connection.rollback(() => reject(err));

                  // 7. Yemekçilik tablosundan user_id'ye bağlı kayıtları sil
                  const deleteMeals =
                    "DELETE FROM catering WHERE user_id1 = ? OR user_id2 = ?";
                  connection.query(deleteMeals, [userId, userId], (err) => {
                    if (err) return connection.rollback(() => reject(err));

                    // 8. Son olarak user tablosundan kullanıcıyı sil
                    const deleteUser = "DELETE FROM user WHERE user_id = ?";
                    connection.query(deleteUser, [userId], (err) => {
                      if (err) return connection.rollback(() => reject(err));

                      // Tüm işlemler başarılıysa commit et
                      connection.commit((err) => {
                        if (err) return connection.rollback(() => reject(err));
                        resolve(
                          "Kullanıcı ve ilişkili veriler başarıyla silindi."
                        );
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  //});
};

module.exports = {
  signupdb,
  logindb,
  loginTokendb,
  deleteUserdb,
};
