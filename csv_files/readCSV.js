const express = require('express');
const router = express.Router();
const csvtojson = require('csvtojson');
const connection = require('../config_files/configPG')

router.post('/',  (req, res) => {
    csvtojson().fromFile('./statesCSV.csv').then(async source => {
      // console.log(JSON.stringify(source));
        let query = `select * from add_csv_data('${JSON.stringify(source)}')`
        // let query = `select * from add_csv_data('[{"id":"1","state":"","city":"ahmedabad"},{"id":"2","state":"","city":"mehsana"},{"id":"3","state":"gujarat","city":"gandhinagar"},{"id":"4","state":"gujarat","city":"kutch"},{"id":"5","state":"gujarat","city":"rajkot"},{"id":"6","state":"maharashtra","city":"mumbai"},{"id":"7","state":"rajsthan","city":"udaipur"},{"id":"8","state":"delhi","city":"delhi"},{"id":"9","state":"rajsthan","city":"ujjain"},{"id":"10","state":"rajsthan","city":"mount abu"}]')`

        let data = await connection.query(query);
        console.log(data.rows);
        if(data.rows.length == 0){
          res.json({
            msg : "data added to database"
          })
        }else{

          res.json(data.rows)
        }
    })
  })

  module.exports = router;