// import { db } from "../config/dbconn";

export const signout = (req, res) => {
  try {
    res.clearCookie("auth_token").status(200).json("User has been signed out");
  } catch (error) {
    console.error("Error signing out:", error);
    res.status(500).json({ error: "Failed to sign out" });
  }
};

// export const getUsers = async (req, res) => {
//   if (!req.user.isAdmin) {
//     return res
//       .status(403)
//       .json({ error: "You are not authorized to view all users" });
//   }
//   try {
//     const users = await User.find().select("-password");
//     const superAdmins = users.filter(
//       (user) => user.role === "super_admin" || user.role === "admin"
//     );
//     const regularUsers = users.filter((user) => user.role !== "super_admin");

//     // Concatenate super_admins first, followed by regular users
//     const sortedUsers = [...superAdmins, ...regularUsers];
//     res.status(200).json(sortedUsers);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ error: "Failed to fetch users" });
//   }
// };
