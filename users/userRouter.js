const express = require("express");

const userDb = require("./userDb");
const Posts = require("../posts/postDb");

const router = express.Router();

// router.use((req, res, next) => {
//   console.log("inside the user router");
//   next();
// });

router.post("/", (req, res) => {
  userDb
    .insert(req.body)
    .then((hub) => {
      res.status(201).json(hub);
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error adding the user",
      });
    });
});

router.post("/:id/posts", (req, res) => {
  const post = { user_id: parseInt(req.params.id), ...req.body };
  console.log(post);
  Posts.insert(post)
    .then((resp) => {
      res.status(201).json(resp);
    })
    .catch((err) => {
      res.status(404).json({
        message: "Posts for the specified userID does not exist.",
      });
    });
});

router.get("/", (req, res) => {
  userDb.get().then((users) => {
    res.status(200).json(users);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  userDb.getById(id).then((user) => {
    if (!user) {
      res.status(400).json({
        message: "User with the specified ID does not exist.",
      });
    } else {
      res.status(200).json(user);
    }
  });
});

router.get("/:id/posts", (req, res) => {
  const { id } = req.params;
  userDb.getUserPosts(id).then((posts) => {
    if (!posts) {
      res.status(400).json({
        message: "The posts for the specified user ID does not exist.",
      });
    } else {
      res.status(200).json(posts);
    }
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  userDb
    .remove(id)
    .then((resp) => {
      res.status(200).json({
        message: "The user is deleted.",
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "The user with the specified ID does not exist.",
      });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  userDb
    .update(id, req.body)
    .then((resp) => {
      res.status(200).json({
        message: "The user is updated.",
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "The user with the specified ID does not exist.",
      });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
