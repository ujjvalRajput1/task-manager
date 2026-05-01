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