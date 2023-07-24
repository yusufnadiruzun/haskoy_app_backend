const  {createInspectionDb} = require("../databaseOperations/inspection/Inspection")

const createInspection = async (req, res) => {

    const { inspection_name } = req.body;
    createInspectionDb(inspection_name).then(result => { res.send(result) }).catch(err => { res.send(err) });

}

module.exports = { createInspection }