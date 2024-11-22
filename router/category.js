const express = require("express");
const router = express.Router();

const {
  createCategory,
  listCategory,
  removeCategory,
  updateCategory,
} = require("../controllers/category_controllers");

router.post("/createCategory", createCategory);
router.get("/listCategory", listCategory);
router.delete("/removeCategory/:id", removeCategory);
router.put("/updateCategory/:id", updateCategory);
module.exports = router;
