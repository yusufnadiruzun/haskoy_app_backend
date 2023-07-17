
const  {permissionControldb, authoriseDb,deletePermissionDb} = require("../databaseOperations/permission/permission");


const permissionControl = (req,res) => {

    const {usertoken} = req.body;
    permissionControldb(usertoken).then(result => {res.send(result)}).catch(err => {res.send(err)});
    
}

const authorise = (req,res) => {
    const {student_phone, permission_name} = req.body;
    authoriseDb(student_phone, permission_name).then(result => {res.send(result)}).catch(err => {res.send(err)});
}
const deletePermission = (req,res) => {
    const {student_phone, permission_name} = req.body;
    deletePermissionDb(student_phone, permission_name).then(result => {res.send(result)}).catch(err => {res.send(err)});
}

module.exports = {permissionControl,authorise, deletePermission};
