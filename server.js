const express = require("express");

const postsRouter = require("./routers/posts-router.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("<h1>Testing</h2>");
});

server.use("/api/posts", postsRouter);

module.exports = server;
