// http://localhost:3001/api/cursor/1

const cursor_controller = (pool) => {
  return async (req, res) => {
    try {
      const type = "cursor";
      const limit = 10;
      const current_page = parseInt(req.params.page);
      const query = `SELECT COUNT(*) FROM user_accounts`;
      const result = await pool.query(query);
      const total_count = result.rows[0].count;
      res.send({ page: current_page, limit, type, total_count });
    } catch (error) {
      res.send({ error_msg: error.message, error_code: error.code });
    }
  };
};

module.exports = cursor_controller;
