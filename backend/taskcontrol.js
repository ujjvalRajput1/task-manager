const db = require("../config/db");

exports.createTask = (req, res) => {
  const { title, projectId, assignedTo, dueDate } = req.body;

  db.query(
    "INSERT INTO tasks (title,projectId,assignedTo,dueDate) VALUES (?,?,?,?)",
    [title, projectId, assignedTo, dueDate],
    () => res.json({ msg: "Task created" })
  );
};

exports.getTasks = (req, res) => {
  db.query(
    "SELECT * FROM tasks WHERE projectId=?",
    [req.params.projectId],
    (err, result) => res.json(result)
  );
};

exports.updateTask = (req, res) => {
  db.query(
    "UPDATE tasks SET status=? WHERE id=?",
    [req.body.status, req.params.id],
    () => res.json({ msg: "Updated" })
  );
};