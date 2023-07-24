const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'cinema',
  password: '2510',
  port: 5432,
})

let connection;
(async()=>{
     connection = await client.connect();
})();

module.exports = {
  query : (query , params , callback) => {

    return client.query(query , params , callback)
  }
};