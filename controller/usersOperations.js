const getUsersDb = require("../databaseOperations/AllusersOperations/userOperations");

const getUsers = async (req, res) => {
   
    getUsersDb().then(result => { res.send(result) }).catch(err => { res.send(err) });

};

module.exports = {getUsers};