const Roles = {
  USER: "user",
  ADMIN: "admin",
  SUPER_ADMIN: "super_admin",
};
import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: Object.values(Roles),
      default: Roles.USER,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
