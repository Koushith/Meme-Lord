import mongoose, { Schema } from "mongoose";

const instagramPostSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    displayName: {
      type: String,
    },
    instagramPosts: [
      {
        postUrl: {
          type: String,
        },
        proof: {
          type: String,
        },
        isVerified: {
          type: Boolean,
          default: false,
        },
        originalPublishDate: {
          type: Date,
        },
      },
    ],
    votes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const InstagramPost = mongoose.model(
  "InstagramPost",
  instagramPostSchema
);
