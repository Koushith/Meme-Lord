import { Request, Response } from "express";

import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { InstagramPost } from "../../models/instagram-post.model.js";

// get all post
export const getAllPosts = asyncHandler(async (req: Request, res: Response) => {
  const posts = await InstagramPost.find({});

  if (posts) {
    res.status(200).json({
      posts,
    });
  } else {
    throw new Error("Something went wrong, couldnt fetch the posts");
  }
});

// get one post
export const getPostById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await InstagramPost.findOne({ id });
  if (post) {
    res.status(200).json({
      post,
    });
  } else {
    res.status(404).json({
      message: "No Post found",
    });
  }
});

// add post
export const addPost = asyncHandler(async (req: Request, res: Response) => {
  const { user, postUrl } = req.body;
  res.send("add post works");
});

// update post
export const updatePost = asyncHandler(async (req: Request, res: Response) => {
  const { user, postUrl } = req.body;
  res.send("update post works");
});

// delete post
export const deletePost = asyncHandler(async (req: Request, res: Response) => {
  const { user, postUrl } = req.body;
  res.send("delete poat works!!");
});
