import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    displayName: {
      //come from firebase
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
