import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import usersRote from "./routes/user.route.js";
import cors from "cors";

dotenv.config();
const app = express();
console.log(process.env.CORS_ORIGIN)

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/health", (req, res) => {
  res.status(200).send("Server is healthy!");
});

app.use("/api/auth", authRoute);
app.use("/api/data", usersRote);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
