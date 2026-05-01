const db = require("../db");

exports.createTask = (req, res) => {
  const { title } = req.body;

  db.query(
    "INSERT INTO tasks (title, assigned_to) VALUES (?,?)",
    [title, req.user.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Task created" });
    }
  );
};

exports.getTasks = (req, res) => {
  db.query(
    "SELECT * FROM tasks WHERE assigned_to=?",
    [req.user.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};