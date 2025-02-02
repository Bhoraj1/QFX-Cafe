import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import usersRote from "./routes/user.route.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

app.use("/health", (req, res) => {
  res.status(200).send("Server is healthy!");
});

app.use("/api/auth", authRoute);
app.use("/api/users", usersRote);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
