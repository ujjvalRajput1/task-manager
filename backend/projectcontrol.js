const db = require("../config/db");

exports.createProject = (req, res) => {
  if (req.user.role !== "admin") {
    return res.json("Only admin");
  }

  const { title, description } = req.body;

  db.query(
    "INSERT INTO projects (title,description,createdBy) VALUES (?,?,?)",
    [title, description, req.user.id],
    () => res.json({ msg: "Project created" })
  );
};

exports.getProjects = (req, res) => {
  db.query("SELECT * FROM projects", (err, result) => {
    res.json(result);
  });
};