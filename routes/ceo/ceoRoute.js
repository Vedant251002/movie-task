const express = require('express');
const router = express.Router();
const controllers = require('./ceoController.js')
const client = require('../../config_files/redisConfig.js')
const jwt = require('jsonwebtoken');
const sc = 'sc'

function checkLogin(req, res, next) {
  let token = req.headers['authorization'];

    jwt.verify(token , sc , (error , user) => {
      if (user ) {

        next();
      } else {
        res.json({
          msg: "please login first",
        });
      }
    })
    }
function checkAdmin(req,res,next){
  let token = req.headers['authorization'];

  jwt.verify(token , sc , (error , user) => {
  if(user.role == 'admin'){
    next()
  }else{
    res.json({
      msg : 'user not authorised'
    })
  }
  })
}

router.get("/city/:city", checkLogin , checkAdmin, controllers.getCity);
router.get("/cinema/:cinema", checkLogin ,checkAdmin , controllers.getCinema);
router.get("/movie/:movie", checkLogin, checkAdmin , controllers.getMovie)
router.get("/seating_plan/", checkLogin,  checkAdmin, controllers.getSeating);
router.get('/top10',checkLogin, checkAdmin ,controllers.getTop10)
router.get("/released/:year", checkLogin, checkAdmin , controllers.released);
router.get("/wealthyuser/", checkLogin, checkAdmin , controllers.wealthyuser);
router.get("/bookings/",checkLogin, checkAdmin , controllers.bookings);
router.get("/booked_users/",checkLogin, checkAdmin , controllers.booked_users);
router.get("/who_booked/",checkLogin, checkAdmin , controllers.who_booked);

module.exports = router;