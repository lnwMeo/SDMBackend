const express = require("express");
const router = express.Router();

const { callback } = require("../config/callback");

router.post("/callback", callback);

module.exports = router;
