
const  {permissionControldb, authoriseDb,deletePermissionDb,addPermissionDB, getAllPermissionDB} = require("../databaseOperations/permission/permission");

// USER PERMISSION
const permissionControl = (req,res) => {

    const {usertoken} = req.body;
    permissionControldb(usertoken).then(result => {res.send(result)}).catch(err => {res.send(err)});
    
}

const authorise = (req,res) => {
    const {user_phone, permission_name} = req.body;
    authoriseDb(user_phone, permission_name).then(result => {res.send(result)}).catch(err => {res.send(err)});
}
const deletePermission = (req,res) => {
    const {user_phone, permission_name} = req.body;
    deletePermissionDb(user_phone, permission_name).then(result => {res.send(result)}).catch(err => {res.send(err)});
}

// PERMISSION (get all permission_name , add permission)

const getAllPermission = (req,res)=> {
    getAllPermissionDB().then(result => {res.send(result)}).catch(err => {res.send(err)});
}

const addPermission = (req,res) =>{
    const {permission_name} = req.body;
    addPermissionDB(permission_name).then(result => {res.send(result)}).catch(err => {res.send(err)});

}

module.exports = {permissionControl,authorise, deletePermission,addPermission, getAllPermission };
