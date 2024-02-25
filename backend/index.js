const express = require("express");
const mongoose = require("mongoose");
const { Todo } = require("./model/todo_schema");
const app = express();
const port = 3000;
const mongooseURI =
  "mongodb+srv://mani:mani123@cluster0.kw63si7.mongodb.net/todos";

app.use(express.json());

app.post("/todo", async (req, res) => {
  console.log(req.body);
  const { title, description, isCompleted } = req.body;

  var todo = new Todo({
    title: title,
    description: description,
    iscompleted: isCompleted,
  });
  await todo.save();
  res.send({
    title: title,
    description: description,
    iscompleted: isCompleted,
  });
});

app.get("/todo", async (req, res) => {
  Todo.find()
    .then((todo) => res.send(todo))
    .catch((error) => res.send("Error" + error));
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  await mongoose.connect(mongooseURI).then(() => {
    console.log("DB Connected");
  });
});
