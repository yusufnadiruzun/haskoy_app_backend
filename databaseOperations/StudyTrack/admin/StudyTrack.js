const connection = require("../../../helpers/database/connectDatabase");

const addStudyTrackDb = (
  phone,
  date,
  course,
  subject,
  question_count,
  correct_answers,
  incorrect_answers,
  teacher_note
) => {
  return new Promise((resolve, reject) => {
    let query = `select * from user where phone = ('${phone}');`;
    connection.query(query, function (err, result) {
      if (err) throw err;
      if (result.length == 0) {
        reject("phone does not exist");
      } else {
        let user_id = result[0].user_id;

        // Daha önce eklenen bir veriyle aynı olup olmadığını kontrol etmek için bu kodu kullanabilirsin
        // query = `select * from StudyTrack where user_id = '${user_id}' and course = '${course}' and subject = '${subject}'`;

        // connection.query(query, function (err, result) {
        //   if (err) throw err;
        //   if (result.length > 0) {
        //     return reject("this data was already added");
        //   } else {
        query = `INSERT INTO StudyTrack (user_id, track_date, course, subject, question_count, correct_answers, incorrect_answers, teacher_note) VALUES ('${user_id}', '${date}', '${course}', '${subject}', '${question_count}', '${correct_answers}', '${incorrect_answers}', '${teacher_note}')`;
        connection.query(query, function (err, result) {
          if (err) throw err;
          return resolve("Study Track Added");
        });
      }
    });
  });
  //     });
  //   });
};

const getStudyTrackDb = (phone, date, course, subject, role) => {
  return new Promise((resolve, reject) => {
    // Temel sorgu
    let query = `
      SELECT 
        track_date, 
        COUNT(*) AS date_student_count
      FROM user u 
      JOIN StudyTrack s ON u.user_id = s.user_id
      WHERE u.role = ${role}
      GROUP BY track_date
      ORDER BY STR_TO_DATE(track_date, '%d.%m.%Y') DESC
    `;

    // Telefon sorgusu varsa
    if (phone) {
      query = `
        SELECT 
          name, surname, phone, role, photourl, track_date, course, subject, 
          question_count, correct_answers, incorrect_answers
        FROM user u 
        JOIN StudyTrack s ON u.user_id = s.user_id 
        WHERE phone = '${phone}'
      `;
    }

    // Tarih ve telefon sorgusu birlikte varsa
    if (date && phone) {
      query += ` AND track_date = '${date}'`;
    } else if (date) {
      // Sadece tarih sorgusu varsa
      query = `
        SELECT 
          name, surname, phone, role, photourl, track_date, course, subject, 
          question_count, correct_answers, incorrect_answers
        FROM user u 
        JOIN StudyTrack s ON u.user_id = s.user_id 
        WHERE track_date = '${date}' AND u.role = ${role}
        ORDER BY STR_TO_DATE(track_date, '%d.%m.%Y') DESC
      `;
    }

    // Kurs sorgusu varsa
    if (course) {
      query += ` AND course = '${course}'`;
    }

    // Konu sorgusu varsa
    if (subject) {
      query += ` AND subject = '${subject}'`;
    }

    // Veritabanı sorgusu
    connection.query(query, (err, result) => {
      if (err) {
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

const updateStudyTrackDb = (phone, course, subject, teacher_note) => {
  return new Promise((resolve, reject) => {
    // Telefon numarasına göre kullanıcı ID'sini al
    let query = `SELECT u.user_id FROM user u JOIN StudyTrack s ON u.user_id = s.user_id WHERE u.phone = '${phone}'`;

    connection.query(query, function (err, result) {
      if (err) throw err;

      // Kullanıcı bulunamazsa hata döndür
      if (result.length == 0) {
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
        if (teacher_note) {
          updateFields.push(`teacher_note = '${teacher_note}'`);
        }

        // Eğer update edilecek alan varsa, güncelleme sorgusu oluştur
        if (updateFields.length > 0) {
          query = `UPDATE StudyTrack SET ${updateFields.join(
            ", "
          )} WHERE user_id = ${user_id}`;

          connection.query(query, function (err, updateResult) {
            if (err) throw err;

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
