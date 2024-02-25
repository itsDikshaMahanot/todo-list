const { Schema, model } = require("mongoose");

const todoSchema = new Schema({
  title: String,
  description: String,
  iscompleted: Boolean,
});

const Todo = model("Todo", todoSchema);

module.exports = { Todo };
