const mysql = require("mysql2/promise");
const connection = require("../configPG.js");
const express = require("express");
const router = express.Router();

const client = require('../redisConfig.js')

 function checkLogin(req, res, next) {
  client.get('isLogin' , (error,reply) => {

    if (JSON.parse(reply)) {
      next();
    } else {
      res.json({
        msg: "please login first",
      });
    }
  });
  }
router.get("/",checkLogin , async (req, res) => {
  let query = `select * from get_cinema_details();`;
  let data = await connection.query(query);
  res.json(data.rows);
});
router.post("/", checkLogin , async (req, res) => {
  let code = Number(req.query.code);
  let city = req.query.city;
  let address = req.query.address;
  let cinemaName = req.query.cinemaName;

  let query = `select add_cinema( ${code} , '${cinemaName}' , '${city}' , '${address}');`;
//   let params = [code, cinemaName, city_id, address];
  let data = await connection.query(query);
  res.json({
    msg : "done"
  });
});

router.put("/", checkLogin , async (req, res) => {
  let id = Number(req.query.id);
  let code = req.query.code;
  let cinemaName = req.query.cinemaName;
  let address = req.query.address;
  let city = req.query.city;
  let query2 = `update cinema
        set code = ${code},
        name = "${cinemaName}",
        city_id = (select id from city where name = "${city}"),
        address = "${address}"
        where id = ${id}`;
  let [row] = await connection.query(query2);
  res.json(row);
});

router.delete("/",checkLogin ,  async (req, res) => {
  let id = req.query.id;
  let query = `delete from cinema
    where id = ?`;
  let [row] = await connection.query(query);
  res.json(row);
});

module.exports = router;
