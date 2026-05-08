const express = require("express");
const { protect, authorizeRoles } = require("../../middleware/authMiddleware");
const { getUsers, updateUserRole } = require("./userController");

const router = express.Router();

router.use(protect);
router.get("/", authorizeRoles("admin"), getUsers);
router.patch("/:id/role", authorizeRoles("admin"), updateUserRole);

module.exports = router;
