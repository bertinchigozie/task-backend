const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: String,
  sell: String,
  buy: String,
  last: String,
  volume: String,
  baseUnit: String
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
