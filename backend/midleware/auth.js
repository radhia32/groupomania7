const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  try { 
    console.log("mess",req.headers.authorization)
    const token = req.headers.authorization.split(' ')[1];
    
  console.log("token",token)
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log("decodedtoken",decodedToken)
    const userId = decodedToken.userId;
   console.log("userId",userId)

    if (userId) {
    
      req.userId=userId
      next();
    }
  } catch (error) {
    console.log(error)

    res.status(401).json({
      error: 'Invalid user!'

    });
  }
};