const models = require("./cinemaModel");




module.exports = {
  getCinema,
  createCinema,
  updateCinema,
  deleteCinema
}

 
async function getCinema (req, res)  {
  let {rows} = await models.getCinemaDb();
  res.json(rows);
};


async function createCinema(req, res)  {
  await models.createCinemaDb(req.query);

  res.json({
    msg : "done"
  });
};

async function updateCinema (req, res)  {
  await models.updateCinemaDb(req.query);
  res.json(row);
};

  async function deleteCinema (req, res)  {
  await models.deleteCinemaDb(req.query)
  res.json(row);
};


