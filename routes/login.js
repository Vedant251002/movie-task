const express = require("express");
// const session = require("express-session");
const connection = require("../config.js");
const router = express.Router();
const { validationResult } = require("express-validator");
const { validate } = require("../validate.js");

const client = require('../redisConfig.js')

async function checkUserData(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  } else {
    next();
  }
}
async function makeSession(req, res, next) {
  try {
    let [row] = await connection.execute("select name , password , role from users");
    row.map((obj) => {
      if (req.body.name == obj.name && req.body.password == obj.password) {
        console.log("in if");
        req.session.isLogin = true;
        req.session.role = obj.role;
        client.set('isLogin' , true)
        client.set('role' ,obj.role)
        client.get("role" , (error,reply) =>{
          console.log(reply + " in ceo router");
        });
      }
    });
    if (!req.session.isLogin) {
      throw error;
    }
    res.json({
      msg: req.session.isLogin,
    });
  } catch (error) {
    res.json({
      msg: "user not authorised",
    });
  }
}

router.post("/login", validate(), checkUserData, makeSession);

router.post("/logout", (req, res) => {
  req.session.destroy();
  client.set('isLogin' , false)
  client.set('role',"")
  res.json({
    msg: "logout successfull",
  });
});
module.exports = router;
