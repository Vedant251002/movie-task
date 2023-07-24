const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const connection = require("../configPG.js");
const client = require('../redisConfig.js')

function checkLogin(req, res, next) {
    client.get('isLogin' , (error , reply) => {
      // console.log(reply);
      if (reply) {
        next();
      } else {
        res.json({
          msg: "please login first",
        });
      }
    })
    }
  
router.get("/", checkLogin, async (req, res) => {
  let query = `select * from city_data();`;
  let data = await connection.query(query);
  res.json(data.rows);
});

router.post("/", checkLogin, async (req, res) => {
  let city = req.query.city;
  let state = req.query.state;
  let query = `select add_city( $1 ,  $2);`;
  let data = await connection.query(query, [city ,state]);
  res.json({
    msg : 'done'
  });
});

router.put("/",checkLogin , async (req, res) => {
  let id = req.query.id;
  let city = req.query.city;
  let state = req.query.state;
  let query = `select update_city('${city}','${state}',${id})`
  let data = await connection.query(query);
  res.json({
    msg : 'done'
  });
});

router.delete("/",checkLogin , async (req, res) => {
  let id = Number(req.query.id);
  let query = `select delete_city(${id});`;
  let data = await connection.query(query);
  res.json({
    msg : 'done'
  });
});

module.exports = router;
