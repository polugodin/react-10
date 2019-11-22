const { join } = require('path');
const express = require('express');
const bodyParser = require('body-parser');

let { posts, users, lastUserId, lastCommentId } = require('./data');
const getNewUserId = () => ++lastUserId;
const getnewCommentId = () => ++lastCommentId;

const app = express();
app.use(bodyParser.json());
app.use(express.static(join(__dirname, 'dist')));
app.use(express.static(join(__dirname, 'static')));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.get('/getUserNames', (req, res) => {
  const { usersId } = req.query;
  const data = {};
  usersId.forEach(id => (data['user' + id] = users[users.findIndex(user => user.id === +id)].fullName));
  res.send(data);
});

app.post('/signUp', (req, res) => {
  const { fullName, login, email, password } = req.body;

  if (!fullName || !login || !email || !password) {
    res.sendStatus(400);
    return;
  }
  const user = { fullName, login, email, password };
  user.id = getNewUserId();
  users.push(user);
  res.sendStatus(200);
});

app.get('/signIn', (req, res) => {
  const { loginOrEmail, password } = req.query;
  let user = null;

  try {
    if (!loginOrEmail || !password) throw new Error('400');
    for (let i = 0; i < users.length; i++) {
      if (users[i].password === password && (users[i].login === loginOrEmail || users[i].email === loginOrEmail)) {
        user = users[i];
        break;
      }
    }
    if (!user) throw new Error('400');
  } catch (error) {
    res.sendStatus(400);
    return;
  }
  const data = { ...user };
  data.userId = user.id;
  data.id = undefined;
  res.send(data);
});

app.put('/setLike', (req, res) => {
  const { userId, password, postId } = req.body;
  let isSignIn = false;
  let index;

  try {
    if (!userId || !password || !postId) throw new Error('400');
    for (let i = 0; i < users.length; i++) {
      if (users[i].password === password && users[i].id === userId) {
        isSignIn = true;
        break;
      }
    }
    if (!isSignIn) throw new Error('400');
    index = posts.findIndex(post => post.id === postId);
    if (index === -1) throw new Error('400');
  } catch (error) {
    res.sendStatus(400);
    return;
  }

  if (posts[index].likes.includes(userId)) posts[index].likes = posts[index].likes.filter(id => id !== userId);
  else posts[index].likes.push(userId);
  res.sendStatus(200);
});

app.post('/newComment', (req, res) => {
  const { autor, comment, postId } = req.body;
  let userId = null;

  try {
    if (!autor || !comment || !postId) throw new Error('400');

    for (let i = 0; i < users.length; i++) {
      if (users[i].login === autor || users[i].fullName === autor) {
        userId = users[i].id;
        break;
      }
    }
    if (!userId) throw new Error('400');

    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex === -1) throw new Error('400');

    const newComment = { id: getnewCommentId(), userId, comment };
    posts[postIndex].comments.push(newComment);
    res.send(newComment);
  } catch (error) {
    res.sendStatus(400);
    return;
  }
});

app.delete('/deleteComment', (req, res) => {
  let { userId, password, postId, commentId } = req.query;
  let isSignIn = false;

  try {
    if (!userId || !password || !postId || !commentId) throw new Error('400');
    userId = +userId;
    postId = +postId;
    commentId = +commentId;

    for (let i = 0; i < users.length; i++) {
      if (users[i].password === password && users[i].id === userId) {
        isSignIn = true;
        break;
      }
    }
    if (!isSignIn) throw new Error('400');

    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex === -1) throw new Error('400');

    posts[postIndex].comments = posts[postIndex].comments.filter(comment => comment.id !== commentId);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
    return;
  }
});

app.listen(3000, () => console.log('port 3000'));
