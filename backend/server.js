const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const cors = require ('cors');

const userRoutes = require('./routes/user.js');
const postRoutes = require('./routes/post.js');
const commentRoutes = require('./routes/comment.js');
const aimerRoutes = require('./routes/aimer.js');
const dislikeRoutes = require('./routes/dislike.js');

require('dotenv').config();
app.use(bodyParser.json());

app.use(cors());
const port = process.env.PORT
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/aimer', aimerRoutes);
app.listen(port, () => {
  console.log(`🚀 application ready at 4000`);
});

module.exports = app;
