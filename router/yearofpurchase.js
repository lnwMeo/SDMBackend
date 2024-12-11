const express = require("express");
const router = express.Router();

const {
  createYear,
  listYear,
  removeYear,
  updateYear,
} = require("../controllers/yearofpurchase_controller");

router.post("/createYear", createYear);
router.get("/listYear", listYear);
router.delete("/removeYear/:id", removeYear);
router.put("/updateYear/:id", updateYear);
module.exports = router;
