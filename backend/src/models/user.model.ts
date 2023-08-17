import mongoose from "mongoose";

import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
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
    },
  ],
});

export const User = mongoose.model("User", userSchema);
