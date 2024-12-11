const express = require("express");
const router = express.Router();

const {
  createModel,
  updataModel,
  listBrandModal,
  listModal,
  removeModal
} = require("../controllers/modal_product_controllers");

router.post("/createModel", createModel);
router.put("/updataModel/:id", updataModel);
router.get("/listBrandModal", listBrandModal);
router.delete("/removeModal/:id",removeModal)
router.get("/listModal", listModal);

module.exports = router;
