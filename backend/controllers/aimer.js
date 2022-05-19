const db = require('../db');

exports.aimer = (req, res, next) => {
  const { postId } = req.body;
  db.query(
    `INSERT INTO aimer (userid, postid) VALUES (
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
exports.getAimerByPostId = (req, res, next) => {
  const sql =
  `SELECT * from aimer WHERE postid=${req.params.postId}` 
  db.query(sql, (error, result) => {
    if (error) {
    }
    res.send({ status: 200, result });
  });
};
exports.deleteAimer = (req, res) => {
  db.query(
    `DELETE FROM aimer WHERE userid = '${req.userId}' AND postid = '${req.params.postId}'`,
    (error, result) => {
      console.log("2")
      if (error) {
        console.log("errr", error)
        res.status(400).json({
          error,
        });
      } else if (result.affectedRows) return res.status(200).json(result);
      return res.status(401).json({ message: "tu n'est pas autorisé" });
    }
  );
};