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

app.patch("/todo/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    let databaseResponse = await Todo.findById(req.params.id);
    var updated = await Todo.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title ?? databaseResponse.title,
          description: req.body.description ?? databaseResponse.description,
        },
      }
    );

    console.log(updated);
    if (updated.modifiedCount != 1) {
      return res.status(404).json({ message: "Cannot update User" });
    } else {
      return res.status(200).json({ message: "User updated" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.delete("/todo/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    var delresponse = await Todo.deleteOne({ _id: req.params.id });
    console.log(delresponse);

    if (delresponse.deletedCount != 1) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.send({ message: "User deleted " });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  await mongoose.connect(mongooseURI).then(() => {
    console.log("DB Connected");
  });
});
