const  {createInspectionDb, addInspectionDb,deleteInspectionDb,getInspectionNameDb,addInspectionBarcodDb} = require("../databaseOperations/inspection/Inspection")

const createInspection = async (req, res) => {

    const { inspection_name } = req.body;
    createInspectionDb(inspection_name).then(result => { res.send(result) }).catch(err => { res.send(err) });

}

const addInspection = async (req, res) => {
    const { inspection_name, student_phone,status } = req.body;
    addInspectionDb(inspection_name,student_phone,status).then(result => { res.send(result) }).catch(err => { res.send(err) });
}

const deleteInspection = async (req, res) => {
    const { inspection_name, student_phone,date } = req.body;
    deleteInspectionDb(inspection_name,student_phone,date).then(result => { res.send(result) }).catch(err => { res.send(err) });
}

const getInspectionName = async (req, res) => {

    getInspectionNameDb().then(result => { res.send(result) }).catch(err => { res.send(err) });

}

const addInspectionBarcod = async (req, res) => {
    let date = req.params.date;
    let phone = req.params.phone;
    let inspection_name = req.params.inspectionName;

    addInspectionBarcodDb(date,phone,inspection_name).then(result => { res.send(result) }).catch(err => { res.send(err) });
}
module.exports = { createInspection,addInspection,deleteInspection,getInspectionName,addInspectionBarcod }