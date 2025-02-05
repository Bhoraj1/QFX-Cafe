import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { db } from "../config/dbConn.js";


const saltRounds = 7;

export const registerUser = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  try {
    if (!username || !email || !password) {
      return res.status(400).send("All fields are required.");
    }

    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      return res.status(400).send("Email already exists. Try logging in.");
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await db.query(
      "INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );
    // console.log(result.rows);
    res.status(201).send("User registered successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering user.");
  }
};

export const loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    if (!email || !password) {
      return res.status(400).send("Email and password are required.");
    }

    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).send("User not found.");
    }
    const user = result.rows[0];
    const storedHashPassword = user.password;
    const isPasswordMatch = await bcrypt.compare(
      password,
      storedHashPassword
    );
    if (isPasswordMatch) {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        {
          expiresIn: "90d",
        }
      );
      // console.log(process.env.JWT_SECRET)
      // console.log("Generated JWT Token: ", token);
      res.cookie("auth_token", token, {
        httpOnly: true,
        maxAge: 90 * 24 * 60 * 60 * 1000,
      });
      const { password, ...userWithoutPassword } = user;
      res.json({
        message: "Welcome to the Dashboard",
        user: userWithoutPassword,
      });
    } else {
      res.status(401).send("Incorrect Password.");
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send("An error occurred while logging in.");
  }
};
