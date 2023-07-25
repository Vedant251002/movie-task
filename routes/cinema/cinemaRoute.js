const express = require("express");
const router = express.Router();
const client = require('../../config_files/redisConfig.js')
const controllers = require('./cinemaController.js')

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

    router.get("/",checkLogin , controllers.getCinema);
    router.post("/", checkLogin , controllers.createCinema);
    router.put("/", checkLogin , controllers.updateCinema);
    router.delete("/",checkLogin ,controllers.deleteCinema);

    module.exports = router;

