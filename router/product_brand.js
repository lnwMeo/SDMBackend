const express = require("express");
const router = express.Router();

const {
  createBrand,
  listBrand,
  updateBrand,
  removeBrand,
} = require("../controllers/brand_product_controllers");

router.post("/createBrand", createBrand);
router.get("/listBrand", listBrand);
router.put("/updateBrand/:id", updateBrand);
router.delete("/removeBrand/:id", removeBrand);

module.exports = router;
