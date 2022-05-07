const db = require('../db');


const getImageUrl = (req) =>
  req.protocol + '://' + req.get('host') + '/images/' + req.file.filename;


exports.createPost = (req, res, next) => {
console.log("error",req.body)
console.log("userId",req.userId)
const file = getImageUrl(req)
console.log("file", file)
  const query = `INSERT INTO posttable (description, image, userId) VALUES ('${req.body.description}', '${file}', '${req.userId}')`;

  db.query(query, (error, result) => {
    if (error) {
      console.log("errrffff", error)
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
    `DELETE FROM posttable WHERE postId = '${req.params.id}'`,
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