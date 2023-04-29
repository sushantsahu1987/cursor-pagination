// http://localhost:3001/api/offset/1

const offset_controller = (pool) => {
  return async (req, res) => {
    try {
      const query = `SELECT COUNT(*) FROM user_accounts`;
      const count_result = await pool.query(query);
      const total_count = count_result.rows[0].count;
      const type = "offset";
      const limit = 10;
      const current_page = parseInt(req.params.page);

      // Calculate the offset based on the page size and number
      const offset = (current_page - 1) * limit;
      const query_pagination = `SELECT * FROM user_accounts LIMIT $1 OFFSET $2`;
      const pg_result = await pool.query(query_pagination, [limit, offset]);
      const total_pages = Math.ceil(total_count / limit);

      res.send({
        result: pg_result.rows,
        page: current_page,
        limit,
        type,
        total_count,
        total_pages
      });
    } catch (error) {
      res.send({ error_msg: error.message, error_code: error.code });
    }
  };
};
module.exports = offset_controller;
