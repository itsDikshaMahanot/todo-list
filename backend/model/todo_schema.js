const { Schema, model } = require("mongoose");

const todoSchema = new Schema(
  {
    title: { type: String },
    description: String,
    iscompleted: Boolean,
  },
  { timestamps: true, versionKey: false }
);

const Todo = model("Todo", todoSchema);

module.exports = { Todo };
