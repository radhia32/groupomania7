const db = require('../db');

exports.createPost = (req, res, next) => {
console.log("error",req.body)
console.log("userId",req.userId)

  const query = `INSERT INTO posttable (description, image, userId) VALUES ('${req.body.description}', 'img', '${req.userId}')`;

  db.query(query, (error, result) => {
    if (error) {
      return res.status(400).json({
        error,
      });
    }
    return res.status(201).json({
      message: 'post added !', post:result
    });
  });
};

exports.getAllPosts = (req, res, next) => {
  const sql =
    'SELECT * FROM posttable INNER JOIN user WHERE user.userId = posttable.userId' 
  db.query(sql, (error, result) => {
    if (error) {
    }
    res.send({ status: 200, result });
  });
};

exports.deletePost = (req, res) => {
  db.query(
    `DELETE FROM posttable WHERE postId = '${req.params.id}' AND userId = '${req.userId}'`,
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