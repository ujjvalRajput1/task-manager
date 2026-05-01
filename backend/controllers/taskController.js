exports.getTasks = async (req, res) => {
  try {
    const [result] = await db.query(
      "SELECT * FROM tasks WHERE assigned_to=?",
      [req.user.id]
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.createTask = async (req, res) => {
  try {
    const { title } = req.body;

    const [result] = await db.query(
      "INSERT INTO tasks (title, assigned_to) VALUES (?, ?)",
      [title, req.user.id]
    );

    res.json({
      message: "Task created",
      taskId: result.insertId
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};