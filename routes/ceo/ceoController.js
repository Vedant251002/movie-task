
const models = require('./ceoModel.js')


module.exports = {
  getCity,
  getCinema,
  getMovie,
  getSeating,
  getTop10,
  released,
  wealthyuser,
  bookings,
  booked_users,
  who_booked
}

async function getCity(req,res){
  let {rows} = await models.getCity(req.params.city)
  res.json(rows);
}

async function getCinema(req,res){
  let {rows} = await models.getCinema( req.params.cinema)
  res.json(rows);
}


async function getMovie (req, res)  {
  let {rows} = await models.getMovie( req.params.movie)
  res.json(rows);
};

async function getSeating(req, res) {
  let {rows} = await models.seatDb(req.query)
  res.json(rows);
};

async function getTop10(req, res) {
  let {rows} = await models.top10Db()
  res.json(rows);
};

 async function released(req, res) {
  let year = req.params.year;
  let {rows} = await models.releaseDateDb(year)
  res.json(rows);
};

async function wealthyuser(req, res)  {
  let {rows} = await models.wealthyUserDb()
  res.json(rows);
};

async function bookings (req, res)  {
  let {rows} = await models.bookingDb();
  res.json(rows);
};

async function booked_users(req, res)  {
  let {rows} = await models.booked_usersDb();
  res.json(rows);
};

async function who_booked (req, res) {
  let {rows} = await models.who_bookedDb(req.query)
  res.json(rows);
};
