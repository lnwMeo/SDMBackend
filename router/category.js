const express = require("express");
const router = express.Router();

const {createCategory,listCategory,removeCategory} = require('../controllers/category_controllers')

router.post("/createCategory",createCategory)
router.get("/listCategory",listCategory)
router.delete("/removeCategory/:id",removeCategory)
module.exports = router;
