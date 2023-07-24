var createError = require("http-errors");
var express = require("express");
var path = require("path");
var session = require("express-session");


var cityApi = require("./routes/cityDemo.js");
var cinemaApi = require("./routes/cinemaDemo.js");
const ceoApi = require("./routes/ceo/ceoRoute.js");
const login = require("./routes/login.js");
const readApi = require('./readCSV.js')

var app = express();

app.use(session({ secret: "Shh, its a secret!" }));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/login", login);
app.use("/city", cityApi);
app.use("/cinema", cinemaApi);
app.use("/ceo", ceoApi);
app.use('/readcsv' , readApi)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
