const page_controller = (db) => {
  return async (req, res) => {
    const currentPage = parseInt(req.params.page);
    try {
      const collection = db.collection("user_accounts");
      const total_count = await collection.countDocuments();
      const limit = 10;
      const type = "offset";
      const skip = (currentPage - 1) * limit;
      const total_pages = Math.ceil(total_count / limit);

      // perform the query
      const results = await db
        .collection("user_accounts")
        .find()
        .skip(skip)
        .limit(limit)
        .toArray();

      res.send({
        results,
        page: currentPage,
        limit,
        total_count,
        total_pages,
        type,
      });
    } catch (error) {
      res.send({ error_msg: error.message, error_code: error.code });
    }
  };
};

module.exports = page_controller;
