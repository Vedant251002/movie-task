const express = require('express')
const router = express.Router();
const  validateUser  = require("../../validate");
const controller = require('./loginController')


router.post("/", validateUser,controller.makeToken);

module.exports = router;