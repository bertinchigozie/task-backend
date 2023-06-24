const express = require("express");
const app = express();
const dotenv = require("dotenv");
const Task = require("./model/taskModel");
dotenv.config({ path: "./config.env" });
const fetch = require("node-fetch");

const url = process.env.MAIN_URL;

app.get("/", async (req, res) => {
  try {
    const resp = await fetch(url);
    const fetchData = await resp.json();
    const arrayData = Object.entries(fetchData);
    const handleData = arrayData.slice(0, 10);
    const mapData = handleData.map((data) => {
      Task.deleteMany();
      Task.create({
        name: data[1].name,
        sell: data[1].sell,
        buy: data[1].buy,
        last: data[1].last,
        volume: data[1].volume,
        baseUnit: data[1].base_unit
      });
      return {
        name: data[1].name,
        sell: data[1].sell,
        buy: data[1].buy,
        last: data[1].last,
        volume: data[1].volume,
        baseUnit: data[1].base_unit
      };
    });
    res.json({
      status: "ok",
      data: mapData
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message
    });
  }
});

app.all("*", (req, res, next) => {
  try {
    throw new Error(`Can't find ${req.originalUrl} on the server`);
  } catch (error) {
    res.json({
      status: 404,
      message: error.message
    });
  }
});
module.exports = app;
