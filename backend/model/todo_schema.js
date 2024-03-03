const { Schema, model } = require("mongoose");

const todoSchema = new Schema(
  {
    title: String,
    description: String,
    iscompleted: Boolean,
  },
  { timestamps: true }
);

const Todo = model("Todo", todoSchema);

module.exports = { Todo };
