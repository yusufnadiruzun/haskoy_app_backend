const {addStudyTrackDb, getStudyTrackDb,updateStudyTrackDb,getClassStudentsDb} = require("../databaseOperations/StudyTrack/admin/StudyTrack")

const addStudyTrack = (req,res) => {

    const { phone, date, course, subject, question_count, correct_answers, incorrect_answers, teacher_note} = req.body;

     addStudyTrackDb( phone, date, course, subject, question_count, correct_answers, incorrect_answers, teacher_note).then(result => res.send(result)).catch(err => res.send(err));
    
}

const getStudyTrack =  (req,res) => {
    const { phone, date, course, subject} = req.body;

    getStudyTrackDb(phone, date, course, subject).then(result => res.send(result)).catch(err => res.send(err));

}

const updateStudyTrack =  (req,res) => {
    const { phone, date, course, subject} = req.body;

    updateStudyTrackDb( phone, date, course, subject).then(result => res.send(result)).catch(err => res.send(err));

}

const getClassStudents =  (req,res) => {
    const { classLevel} = req.body;

    getClassStudentsDb(classLevel).then(result => res.send(result)).catch(err => res.send(err));

}

module.exports = {addStudyTrack, getStudyTrack, updateStudyTrack,getClassStudents};