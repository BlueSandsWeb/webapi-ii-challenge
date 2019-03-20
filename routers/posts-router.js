const express = require("express");

const db = require("../data/db.js");

const router = express.Router();

// Create
router.post("/", async (req, res) => {
  if (req.body.title && req.body.contents) {
    try {
      const newPost = await db.insert(req.body);
      console.log(newPost);
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({
        message: "Error adding the hub"
      });
    }
  } else {
    res.status(400).json({
      error: "Please provide title and contents for the post."
    });
  }
});

// Retrieve all posts
router.get("/", async (req, res) => {
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      error: "Error retrieving the posts"
    });
  }
});

// Retrieve single post
router.get("/:id", async (req, res) => {
  const id = await req.params.id;
  try {
    const post = await db.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      message: "Error retriving the post"
    });
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await db.update(req.params.id, req.body);
    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ error: "The post could not be found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating post"
    });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const count = await db.remove(req.params.id);
    if (count === 1) {
      res.status(200).json({ message: "The post has been removed" });
    } else {
      res
        .status(404)
        .json({ error: "The post with the specified ID does not exist." });
    }
  } catch (Error) {
    res.status(500).json({ error: "The post could not be removed" });
  }
});

module.exports = router;
