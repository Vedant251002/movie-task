const express = require('express')
const router = express.Router();

const { validate } = require("../../validate");
const controller = require('./loginController')


router.post("/", validate(),controller.makeToken);
router.post("/logout", controller.logout);

module.exports = router;