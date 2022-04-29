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


app.use(bodyParser.json());

app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/aimer', aimerRoutes);
app.use('/api/dislike', dislikeRoutes);
app.listen(4000, () => {
  console.log(`🚀 application ready at 4000`);
});

module.exports = app;
