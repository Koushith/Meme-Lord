import express from "express";

import {
  addPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from "../../controllers/post/post.controller.js";

const router = express.Router();

router.route("/").get(getAllPosts).post(addPost);
router.route("/:id").get(getPostById).put(updatePost).delete(deletePost);

export default router;
