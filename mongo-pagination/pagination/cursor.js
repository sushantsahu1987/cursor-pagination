const cursor_controller = async (req, res) => {
  try {
    const collection = db.collection("user_accounts");
    const total_count = await collection.countDocuments();
    const limit = 10;
    const type = "cursor";
    res.send({ page: req.params.page, limit, total_count, type });
  } catch (error) {
    res.send({ error_msg: error.message, error_code: error.code });
  }
};

module.exports = cursor_controller;
