
const connection = require("../../config_files/configPG");

module.exports = {
    getCityDb,
    createCityDb,
    updateCityDb,
    deleteCityDb
}

async function getCityDb(){
    let query = `select * from city_data();`;
    return connection.query(query);
}

async function createCityDb({city,state}){
    let query = `select add_city( $1 ,  $2);`;
    return connection.query(query, [city ,state]);
}

async function updateCityDb({city,state,id}){
    let query = `select update_city('${city}','${state}',${id})`
    return connection.query(query);
}

async function deleteCityDb({id}){
    let query = `select delete_city(${+id});`;
    return connection.query(query);
}