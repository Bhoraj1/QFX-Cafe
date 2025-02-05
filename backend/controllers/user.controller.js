import { db } from "../config/dbConn.js";

export const asnwers = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT answer FROM answers ORDER BY id LIMIT 1"
    );
    res.json({ answer: result.rows[0].answer });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
