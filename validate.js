const { body } = require('express-validator')

exports.validate = () => {
     return  [
      body('name' , 'enter valid name' ).notEmpty(),
      body('password','enter valid password').notEmpty()
    ]
}