const express = require("express");
const router = express.Router();
const {
  getCriptoDataController,
} = require("../controllers/getCriptoDataController");

router.get("/getCriptoData", getCriptoDataController);

module.exports = router;
