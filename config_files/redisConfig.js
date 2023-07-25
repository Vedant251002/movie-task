
const redis = require("redis");
const client = redis.createClient();


module.exports = {
    set : (name , value ) => client.set(name , value),
    get : (name , callback) =>  client.get(name , callback)
}