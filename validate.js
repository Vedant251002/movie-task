

const Joi = require('joi');
function validateUser(user)
{
    const JoiSchema = Joi.object({
      
      name: Joi.string()
                  .min(1)
                  .max(10)
                  .required(),
                    
                  password: Joi.string()
               .min(1)
               .max(10)
               .required(), 
                
    }).options({ abortEarly: false });
  
    return JoiSchema.validate(user)
}

function checkData(req,res,next){
  let user = req.body;
  let response = validateUser(user);
  if(response.error){
    console.log(response.error.details);
    res.json(response.error.details)
  }else{
    next();
  }
}

module.exports = checkData;