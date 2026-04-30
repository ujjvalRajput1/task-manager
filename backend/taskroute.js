const router = require("express").Router();
const auth = require("../middleware/auth");
const { createTask, getTasks, updateTask } = require("../controllers/taskController");

router.post("/", auth, createTask);
router.get("/:projectId", auth, getTasks);
router.put("/:id", auth, updateTask);

module.exports = router;