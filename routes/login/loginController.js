
const models = require('./loginModel')
const jwt = require('jsonwebtoken')
const sc = 'sc'

module.exports = {
  
  makeToken,
  logout
}

async function makeToken(req, res, next) {
  try {
    let {rows} = await models.checkUser(req.body);
    if(rows.length == 1){
      let token = await jwt.sign({name : rows[0].name,role : rows[0].role},sc , {expiresIn : '30s'})
      res.json({
        token ,
      });
    }
  } catch (error) {
    res.json({
      msg: "user not authorised",
    });
  }
}



function logout(req, res)  {

};
