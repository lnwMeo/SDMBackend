const express = require("express");
const router = express.Router();

const {
  createModel,
  updataModel,
  listBrandModal,
  listModal,
  removeModal
} = require("../controllers/modal_product_controllers");

router.post("/createModel/:brandId", createModel);
router.put("/updataModel/:id", updataModel);
router.get("/listBrandModal", listBrandModal);
router.get("/listModal", listModal);
router.delete("/removeModal/:id",removeModal)

module.exports = router;
