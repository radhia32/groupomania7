const db = require('../db');

exports.dislike = (req, res, next) => {
  const { postId } = req.body;
  db.query(
    `INSERT INTO dislike (userId, postId) VALUES (
      '${req.userId}', '${postId}')`,
    (error, result) => {
      if (error) {
        res.status(400).json({
          error,
        });
      }
      res.status(200).json(result);
    }
  );
}
exports.getDislikeByPostId = (req, res, next) => {
  const sql =
  `SELECT * from dislike WHERE postId=${req.params.postId}` 
  db.query(sql, (error, result) => {
    if (error) {
    }
    res.send({ status: 200, result });
  });
};
exports.deleteDislike= (req, res) => {
  db.query(
 
    `DELETE FROM dislike WHERE userid = '${req.userId}' AND postid = '${req.params.postId}'`,
    (error, result) => {
      if (error) {
        res.status(400).json({
          error,
        });
      } else if (result.affectedRows) return res.status(200).json(result);
      return res.status(401).json({ message: "tu n'est pas autorisé" });
    }
  );
};