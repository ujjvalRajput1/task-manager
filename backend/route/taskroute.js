const auth = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();
const taskController = require('../controllers/taskController');
const { createTask, getTasks } = require("../controllers/taskController");

router.post("/", auth, createTask);
router.get("/", auth, getTasks);

module.exports = router;