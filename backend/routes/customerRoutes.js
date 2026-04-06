const express = require("express");
const router = express.Router();

const {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer
} = require("../controllers/customerController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getCustomers);
router.post("/", authMiddleware, addCustomer);
router.put("/:id", authMiddleware, updateCustomer);
router.delete("/:id", authMiddleware, deleteCustomer);

module.exports = router;