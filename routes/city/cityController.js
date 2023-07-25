const models = require("./cityModel");

module.exports = {
  getCity,
  createCity,
  updateCity,
  deleteCity
}

 async function getCity (req, res)  {
  let {rows} = await models.getCityDb();
  res.json(rows);
};

 async function createCity (req, res)  {
  await models.createCityDb(req.query);
  res.json({
    msg : 'done'
  });
};

 async function updateCity (req, res) {
  await models.updateCityDb(req.query)
  res.json({
    msg : 'done'
  });
};

async function deleteCity (req, res) {
  await models.deleteCityDb(req.query)
  res.json({
    msg : 'done'
  });
};
