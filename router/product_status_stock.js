const express = require("express");
const router = express.Router();

const {
  updateStatusStock,
} = require("../controllers/product_status_stock_controllers");
router.put("/updateStatusStock/:orderId", updateStatusStock);
module.exports = router;
