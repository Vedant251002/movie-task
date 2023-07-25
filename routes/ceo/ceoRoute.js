const express = require('express');
const router = express.Router();
const controllers = require('./ceoController.js')
const client = require('../../config_files/redisConfig.js')

function checkLogin(req, res, next) {
    client.get('role' , (error , reply) => {
      // console.log(reply);
      if (reply == "ceo") {
        next();
      } else {
        res.json({
          msg: "Not authorised user",
        });
      }
  
    })
  }

router.get("/city/:city", checkLogin , controllers.getCity);
router.get("/cinema/:cinema", checkLogin , controllers.getCinema);
router.get("/movie/:movie", checkLogin, controllers.getMovie)
router.get("/seating_plan/", checkLogin, controllers.getSeating);
router.get('/top10',checkLogin,controllers.getTop10)
router.get("/released/:year", checkLogin, controllers.released);
router.get("/wealthyuser/", checkLogin, controllers.wealthyuser);
router.get("/bookings/",checkLogin, controllers.bookings);
router.get("/booked_users/",checkLogin, controllers.booked_users);
router.get("/who_booked/",checkLogin, controllers.who_booked);

module.exports = router;