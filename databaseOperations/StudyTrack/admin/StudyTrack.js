const connection = require("../../../helpers/database/connectDatabase");

const addStudyTrackDb = (
  phone,
  date,
  study_session, // Yeni eklenen parametre
  course,
  subject,
  question_count,
  correct_answers,
  incorrect_answers,
  teacher_note
) => {
  return new Promise((resolve, reject) => {
    // Kullanıcıyı telefon numarasına göre bul
    let query = `SELECT * FROM user WHERE phone = '${phone}';`;
    connection.query(query, function (err, result) {
      if (err) throw err;
      if (result.length === 0) {
        reject("Phone does not exist");
      } else {
        let user_id = result[0].user_id;

        // Daha önce aynı kullanıcı, aynı tarih ve aynı etüt numarası için veri eklenmiş mi kontrol et
        query = `SELECT * FROM StudyTrack WHERE user_id = '${user_id}' AND track_date = '${date}' AND study_session = '${study_session}';`;
        connection.query(query, function (err, result) {
          if (err) throw err;
          if (result.length > 0) {
            return reject("This data for the given session already exists");
          } else {
            // Yeni veri ekle
            query = `
              INSERT INTO StudyTrack (
                user_id, track_date, study_session, course, subject, 
                question_count, correct_answers, incorrect_answers, teacher_note
              ) VALUES (
                '${user_id}', '${date}', '${study_session}', '${course}', '${subject}', 
                '${question_count}', '${correct_answers}', '${incorrect_answers}', '${teacher_note}'
              );
            `;
            connection.query(query, function (err, result) {
              if (err) throw err;
              return resolve("Study Track Added");
            });
          }
        });
      }
    });
  });
};


const getStudyTrackDb = (phone, date, study_session, course, subject, role) => {
  return new Promise((resolve, reject) => {
    // Temel sorgunun başlangıcı
    let query = `
      SELECT 
        track_date, 
        study_session, 
        COUNT(*) AS session_student_count
      FROM user u 
      JOIN StudyTrack s ON u.user_id = s.user_id
      WHERE u.role = ${role}
    `;

    // Telefon sorgusu varsa, farklı sorguya geç
    if (phone) {
      query = `
        SELECT 
          name, surname, phone, role, photourl, track_date, study_session, course, subject, 
          question_count, correct_answers, incorrect_answers
        FROM user u 
        JOIN StudyTrack s ON u.user_id = s.user_id 
        WHERE phone = '${phone}'
      `;
    }

    // Ek filtreler
    if (date) {
      query += ` AND track_date = '${date}'`;
    }
    if (study_session) {
      query += ` AND study_session = '${study_session}'`;
    }
    if (course) {
      query += ` AND course = '${course}'`;
    }
    if (subject) {
      query += ` AND subject = '${subject}'`;
    }

    // Telefon yoksa GROUP BY ve ORDER BY ekle
    if (!phone) {
      query += `
        GROUP BY track_date, study_session
        ORDER BY STR_TO_DATE(track_date, '%d.%m.%Y') DESC, study_session ASC
      `;
    }

    console.log("Executing Query:", query); // Hata ayıklama için sorguyu göster

    // Veritabanı sorgusu
    connection.query(query, (err, result) => {
      if (err) {
        console.error("Query Error:", err); // Hata detayını göster
        reject(err);
        return;
      }

      if (result.length === 0) {
        reject("Track not found");
        return;
      }

      resolve(result);
    });
  });
};




const updateStudyTrackDb = (phone, course, subject, study_session, teacher_note) => {
  return new Promise((resolve, reject) => {
    // Telefon numarasına göre kullanıcı ID'sini al
    let query = `SELECT u.user_id FROM user u JOIN StudyTrack s ON u.user_id = s.user_id WHERE u.phone = '${phone}'`;

    connection.query(query, function (err, result) {
      if (err) {
        reject(err);
        return;
      }

      // Kullanıcı bulunamazsa hata döndür
      if (result.length === 0) {
        return reject("Phone number does not exist");
      } else {
        let user_id = result[0].user_id;

        // Güncelleme için boş olmayan alanları belirle
        let updateFields = [];

        if (course) {
          updateFields.push(`course = '${course}'`);
        }
        if (subject) {
          updateFields.push(`subject = '${subject}'`);
        }
        if (study_session) {
          updateFields.push(`study_session = '${study_session}'`);
        }
        if (teacher_note) {
          updateFields.push(`teacher_note = '${teacher_note}'`);
        }

        // Eğer update edilecek alan varsa, güncelleme sorgusu oluştur
        if (updateFields.length > 0) {
          query = `UPDATE StudyTrack SET ${updateFields.join(
            ", "
          )} WHERE user_id = ${user_id}`;

          connection.query(query, function (err, updateResult) {
            if (err) {
              reject(err);
              return;
            }

            // Başarılı güncelleme sonrası mesaj döndür
            resolve("Study Track Updated Successfully");
          });
        } else {
          // Eğer güncellenecek veri yoksa
          resolve("No fields to update");
        }
      }
    });
  });
};


const getClassStudentsDb = (classLevel) => {
  return new Promise((resolve, reject) => {
    let query = `select name,surname,phone,role from user where role = '${classLevel}'`;
    connection.query(query, function (err, result) {
      if (err) throw err;
      if (result.length == 0) {
        reject("students not found");
      } else {
        return resolve(result);
      }
    });
  });
};

module.exports = {
  addStudyTrackDb,
  getStudyTrackDb,
  updateStudyTrackDb,
  getClassStudentsDb,
};
