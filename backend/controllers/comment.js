const db = require('../db');

exports.addComment = (req, res, next) => {
  const { comment, postId } = req.body;
  db.query(
    `INSERT INTO commenttable (comment, userId, postId) VALUES ('${comment}', 
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
exports.getCommentsByPostId = (req, res, next) => {
  const sql =
  `SELECT user.nom, user.prenom, user.userId, commenttable.comment, commenttable.commentId FROM user, commenttable INNER JOIN posttable 
  ON posttable.postId = commenttable.postId WHERE user.userId = commenttable.userId AND posttable.postId='${req.params.id}'` 
  db.query(sql, (error, result) => {
    if (error) {
    }
    res.send({ status: 200, result });
  });
};
exports.deleteComment = (req, res) => {
  db.query(
    `DELETE FROM commenttable WHERE commentId = '${req.params.id}'`,
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