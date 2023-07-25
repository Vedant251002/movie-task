const connection = require("../../config_files/configPG.js");

module.exports = {
    getCinemaDb,
    createCinemaDb,
    updateCinemaDb,
    deleteCinemaDb
}

async function getCinemaDb(){
 let query = `select * from get_cinema_details();`;
  return connection.query(query);
}

async function createCinemaDb({code,cinemaName,city,address}){
  let query = `select add_cinema( ${code} , '${cinemaName}' , '${city}' , '${address}');`;
  //   let params = [code, cinemaName, city_id, address];
    return connection.query(query);
}

async function updateCinemaDb({code , cinemaName , city , address , id}){
  let query = `update cinema
  set code = $1,
  name = $2,
  city_id = (select id from city where name = "${city}"),
  address = $3
  where id = $4`;
 return connection.query(query , [code , cinemaName , address , id]);
}

async function deleteCinemaDb({id}){
  let query = `delete from cinema
    where id = $1`;
  return connection.query(query,[+id]);
}