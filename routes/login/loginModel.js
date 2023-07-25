const connection = require('../../config_files/configPG')

module.exports = {
    checkUser
}

async function checkUser({name,password}){
    let query = 'select name , password , role from users where name = $1 and password = $2'
    return connection.query(query,[name , password]);
}