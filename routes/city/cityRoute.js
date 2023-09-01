const express = require('express');
const router = express.Router();
// const client = require('../../config_files/redisConfig')
const controllers = require('./cityController.js')
const jwt = require('jsonwebtoken');
const sc = 'sc'

function checkLogin(req, res, next) {
  let token = req.headers['authorization'];

    jwt.verify(token , sc , (error , reply) => {
      if (reply) {
        next();
      } else {
        res.json({
          msg: "please login first",
        });
      }
    })
    }

router.get("/", checkLogin,controllers.getCity);
router.post("/", checkLogin, controllers.createCity);
router.put("/",checkLogin , controllers.updateCity);
router.delete("/",checkLogin , controllers.deleteCity);


module.exports = router;