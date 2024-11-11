const express = require("express");
const router = express.Router();

const {
//   createBorrowStatus,
  updateBorrowStatus
} = require("../controllers/borrow_status_controllers");

// router.post("/createBorrowStatus", createBorrowStatus);
router.put("/updateBorrowStatus/:productId", updateBorrowStatus);

module.exports = router;
