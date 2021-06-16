const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 4000;

const ObjectId = require('mongoose').Types.ObjectId; 
const connection_url = 'mongodb+srv://admin:zN2yWWN2b94mlWGm@cluster0.asois.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(connection_url, {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

const todosSchema = new mongoose.Schema({
  userId: mongoose.Schema.ObjectId,
  todos: [
    {
      checked: Boolean,
      text: String,
      id: String,
    }
  ],
});

const Todos = mongoose.model('todos', todosSchema);

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  const {username, password} = req.body;
  const user = await User.findOne({ username }).exec();
  if (user) {
    res.status(500);
    res.json({
      message: "user already exists",
    });
    return;
  }
  await User.create({ username, password });
  res.send({
    message: "success",
  });
});

app.post("/login", async (req, res) => {
  const {username, password} = req.body;
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({
      message: "user does not exist",
    });
    return;
  }
  await User.create({ username, password });
  res.send({
    message: "success",
  });
});

app.post("/todos", async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  const todosItems = req.body;
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({
      message: "user does not exist",
    });
    return;
  }
  const todos = await Todos.findOne({ userId: user._id }).exec();
  if (!todos) {
    await Todos.create({
      userId: user._id,
      todos: todosItems,
    })
  } else {
    todos.todos = todosItems;
    await todos.save();
  }
  res.json(todosItems);
});

app.get("/todos", async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({
      message: "user does not exist",
    });
    return;
  }
  const { todos } = await Todos.findOne({ userId: user._id }).exec();
  res.json(todos);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  app.listen(port, () => {
    console.log("hi")
  });
});