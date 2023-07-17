
const permissionControldb = require("../databaseOperations/permission/permission");

const permissionControl = (req,res) => {

    const {usertoken} = req.body;
    permissionControldb(usertoken).then(result => {res.send(result)}).catch(err => {res.send(err)});
    
}

module.exports = permissionControl;
