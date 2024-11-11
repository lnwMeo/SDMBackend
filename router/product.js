const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/product/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const {
  createProduct,
  updateProduct,
  removeProduct,
  listProduct,
} = require("../controllers/product_controllers");

// ENDPOINT
router.post("/createProduct", upload.array("images", 6), createProduct);
router.put("/updateProduct/:id", upload.array("images", 6), updateProduct);
router.delete("/deleteProduct/:id", removeProduct);
router.get("/listProduct", listProduct);


// router.use('/assets', express.static('assets'));


module.exports = router;
