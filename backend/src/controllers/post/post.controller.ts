import { reclaimprotocol } from "@reclaimprotocol/reclaim-sdk";

import * as cheerio from "cheerio";

import puppeteer from "puppeteer-core";

import { Request, Response } from "express";

import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { InstagramPost } from "../../models/instagram-post.model.js";
import { User } from "../../models/user.model.js";

//TODO: fix user path

const reclaim = new reclaimprotocol.Reclaim();

// get all post
export const getAllPosts = asyncHandler(async (req: Request, res: Response) => {
  const posts = await InstagramPost.find({});
  console.log("postssss", posts);

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
  console.log("indide get one post -id", id);
  const user = await User.findById(id);

  const post = await InstagramPost.findOne({ user: id });
  if (post) {
    res.status(200).json({
      post,
      displayName: user?.displayName,
    });
  } else {
    res.status(404).json({
      message: "No Post found",
    });
  }
});

// add post
export const addPost = asyncHandler(async (req: Request, res: Response) => {
  // const { user, postUrl, proof, isVerified, originalPublishDate } = req.body;
  const { user, instagramPosts, votes } = req.body;
  console.log("instagram posts", instagramPosts);
  // init reclaim

  // generate url and save
  const baseCBurl = process.env.CALLBACK_URL;
  const callbackUrl = `${baseCBurl}/callback`;

  console.log("callback base", callbackUrl);

  const request = reclaim.requestProofs({
    title: "Prove you own this instagram account.",
    baseCallbackUrl: callbackUrl,
    requestedProofs: [
      new reclaim.CustomProvider({
        provider: "instagram-user",
        payload: {},
        //TODO:- WHAT ITEMS GOES INSIDE THIS?
      }),
    ],
  });

  const reclaimUrl = await request.getReclaimUrl({ shortened: true });

  const { callbackId, template, id } = request;
  console.log("what the heck is template?", template);
  console.log(user, instagramPosts, votes);
  // Find the existing document for the user
  // if no user - new post, else append to the ig array
  const userName = await User.findById(user);
  // console.log("userrrrrrr", userName?.displayName);
  const query = await InstagramPost.findOne({ user });

  //console.log("quertyyyyyy", query);

  if (!query) {
    const post = await InstagramPost.create({
      user,
      displayName: userName?.displayName,
      instagramPosts: {
        postUrl: instagramPosts[0].postUrl,
        callbackId: String(callbackId),
        templateId: String(id),
        template: JSON.stringify(template),
        templateUrl: String(reclaimUrl),
        originalPublishDate: instagramPosts[0].originalPublishDate,
      },
      votes,
    });

    res.status(201).json({
      message: "Story saved successfully",
      post,
    });
  } else {
    query.instagramPosts.push({
      postUrl: instagramPosts[0].postUrl,
      callbackId: String(callbackId),
      templateId: String(id),
      template: String(template),
      templateUrl: String(reclaimUrl),
      originalPublishDate: instagramPosts[0].originalPublishDate,
      isVerified: false,
      status: "PENDING",
    });

    const updatedPosts = await query.save();

    res.status(200).json({
      message: "Post appended successfully",
      updatedPosts,
    });
  }
});

// update post
export const updatePost = asyncHandler(async (req: Request, res: Response) => {
  const { user, postUrl } = req.body;
  res.send("update post works");
});

// delete post
export const deletePost = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await InstagramPost.findOneAndUpdate({ id });

  res.status(200).json({
    message: "Post Deleted Successfully!!",
    post,
  });
});

// disputes- should be a table- user raises the disputes -> we verify that and add the ownership

export const firebaseToMongoId = asyncHandler(
  async (req: Request, res: Response) => {
    //takes in uid and returns mongoDBID

    const { uid } = req.params;

    const query = await User.findOne({ uid });
    if (!query) {
      res.status(404);
      throw new Error("no uid found");
    }

    res.status(200).json({
      mesesage: "uid found",
      mongoID: query._id,
      user: query.displayName,
    });
  }
);
