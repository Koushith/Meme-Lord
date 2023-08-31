import { reclaimprotocol } from "@reclaimprotocol/reclaim-sdk";
import fs from "fs/promises";

import * as cheerio from "cheerio";

import puppeteer from "puppeteer-core";

import { Request, Response } from "express";

import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { InstagramPost } from "../../models/instagram-post.model.js";
import { User } from "../../models/user.model.js";
import { htmlParser } from "../../utils/html-parser.js";

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

// get one post -> profile or user info
export const getPostById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("indide get one post -id", id); // this will be a mongo
  const user = await User.findById(id);

  const post = await InstagramPost.findOne({ user: id }).select(
    "-htmlResponse"
  );
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
  console.log("instagram posts", instagramPosts[0].postUrl);

  const instagramResponse = await htmlParser(instagramPosts[0].postUrl);
  console.log("instagram response", instagramResponse);
  // init reclaim

  // generate url and save
  const baseCBurl = process.env.CALLBACK_URL;
  const callbackUrl = `${baseCBurl}/callback`;

  // console.log("callback base", callbackUrl);

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
  // console.log("what the heck is template?", template);
  // console.log(user, instagramPosts, votes);
  // Find the existing document for the user
  // if no user - new post, else append to the ig array
  const userName = await User.findById(user);
  console.log("userrrr-----", userName);
  console.log("userrrrrrr", userName?.displayName);
  const query = await InstagramPost.findOne({ user });

  //console.log("quertyyyyyy", query);

  if (!query) {
    const post = await InstagramPost.create({
      user,
      displayName: userName?.displayName,
      instagramPosts: {
        postUrl: instagramPosts[0].postUrl,
        htmlResponse: String(instagramResponse),
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
      userName: post.displayName,

      reclaimUrl,
      callbackId,
    });
  } else {
    query.instagramPosts.push({
      postUrl: instagramPosts[0].postUrl,
      htmlResponse: String(instagramResponse),
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
      // updatedPosts,
      reclaimUrl,
      callbackId,
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

// proof verification- responses coming back from reclaim wallet
export const verifyProofs = asyncHandler(
  async (req: Request, res: Response) => {
    const { callbackId } = req.query;

    console.log("Callback id----- fro req.queyt", callbackId);

    // console.log("Raw body-----", req.body);
    const { proofs } = JSON.parse(decodeURIComponent(req.body));
    console.log("[Callback -- TEMP] -- Proofs: ", proofs);

    const isValidProof = await reclaim.verifyCorrectnessOfProofs(
      callbackId as string,
      proofs
    );
    console.log("isValidProof------", isValidProof);

    if (isValidProof) {
      const extractProofInfo = proofs[0]?.parameters;
      console.log("extracted proof----", extractProofInfo);
      const parsedProof = JSON.parse(extractProofInfo);
      const profileName = parsedProof?.userName;
      console.log("profile name-----", profileName);
      const post = await InstagramPost.findOne({
        "instagramPosts.callbackId": callbackId,
      });

      // console.log("instagram post with ch", post);

      if (post) {
        const htmlResponse = post?.instagramPosts[0]?.htmlResponse;

        //reges match for name-  if matches, save the post and update the status to verified
        //if not- delete this object
        // Create a regular expression to match the variable name
        const regex = new RegExp(`${profileName}`, "i");

        // Test if the variable name exists in the response
        const doesExist = regex.test(htmlResponse as string);

        console.log(typeof htmlResponse);

        if (doesExist) {
          console.log(`Variable '${profileName}' exists in the response.`);
          // do some db stuff
          post.instagramPosts[0].instagramAccountName = profileName;
          post.instagramPosts[0].status = "VERIFIED";
          // TODO: Experiment- remove this later
          post.instagramPosts[0].htmlResponse = String(profileName);
          post.instagramPosts[0].isVerified = true;
          post.instagramPosts[0].proof = JSON.stringify(proofs);
          // Save the changes
          const update = await post.save();

          res.json({ msg: "Congrats- proof geberated successfully", update });
        } else {
          console.log(
            `Variable '${profileName}' does not exist in the response.`
          );

          // reject- delete

          // Delete the specific object from instagramPosts array using $pull operator
          const deletePost = await InstagramPost.findOneAndUpdate(
            { _id: post._id },
            { $pull: { instagramPosts: { callbackId } } }
          );

          console.log("post deleted----", deletePost);
          res.json({
            message:
              "Failed to verify, page might be private or you are not the owner of that post!!",
          });
        }
      }
    } else {
      res.json({
        message: "Something went wrong. please try again!!",
      });
    }
  }
);

// get status -> for frontend -> recivees callback id and
// return the status.

// export const getStatus = asyncHandler(async (req: Request, res: Response) => {
//   const { callbackId } = req.params;
//   console.log("callback id", callbackId);

//   const postQuery = await InstagramPost.findOne({
//     "instagramPosts.callbackId": callbackId,
//   });
//   console.log("postsss", postQuery);

//   if (!postQuery) {
//     res.status(404).json({
//       message: "No post was found",
//     });
//   } else {
//     res.status(200).json({
//       status: postQuery?.instagramPosts[0].status,
//       isVerified: postQuery?.instagramPosts[0].isVerified,
//       postUrl: postQuery?.instagramPosts[0].postUrl,
//       callbackId: postQuery?.instagramPosts[0].callbackId,
//     });
//   }
// });

export const getStatus = asyncHandler(async (req: Request, res: Response) => {
  const { callbackId } = req.params;
  console.log("callback id", callbackId);

  const postQuery = await InstagramPost.findOne({
    "instagramPosts.callbackId": callbackId,
  });

  // console.log("postsss", postQuery);

  if (!postQuery) {
    res.status(404).json({
      message: "No post was found",
    });
  } else {
    const instagramPost = postQuery.instagramPosts.find(
      (post) => post.callbackId === callbackId
    );

    if (!instagramPost) {
      res.status(404).json({
        message: "No post was found with the provided callback ID",
      });
    } else {
      res.status(200).json({
        status: instagramPost.status,
        isVerified: instagramPost.isVerified,
        postUrl: instagramPost.postUrl,
        callbackId: instagramPost.callbackId,
      });
    }
  }
});
