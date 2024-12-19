const db = require("../database/db");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const postSignUp = (req, res) => {
  const { username, password, email } = req.body;
  const checkUserSql = "SELECT * FROM users WHERE userName = ?";
  db.query(checkUserSql, [username], (err, data) => {
    if (err) return res.json("ERROR");
    if (data.length > 0) {
      return res.json({ status: "User already exists" });
    } else {
      const insertUserSql =
        "INSERT INTO users (userName, password, email) VALUES (?, ?, ?)";
      db.query(insertUserSql, [username, password, email], (err, result) => {
        if (err) return res.json("ERROR");
        return res.json({
          status: "Sign Up Successful",
          user: { username, email },
        });
      });
    }
  });
};

// const postLogIn = (req, res) => {
//   const { email, password } = req.body;
// console.log("leeeeee");
//   const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
//   db.query(sql, [email, password], (err, data) => {
//       if (err) {
//           console.error("SQL Error:", err); // Log the error
//           return res.status(500).json("ERROR");
//       }
//       if (data.length > 0) {
//           return res.json({ status: "Login Successful", user: data[0] });
//       } else {
//           return res.json({ status: "Invalid credentials" });
//       }
//   });
// };



const postSignIn = (req, res) => {
  const { email, password } = req.body;
  console.log("Received email from frontend:", email);
  console.log("Received password from frontend:", password);

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  console.log("Executing query:", query, email, password);

  // Query the database for the user
  db.query(query, [email, password], (error, results) => {
    if (error) {
      console.error("Error during sign-in:", error);
      return res.status(500).json({ message: "Server error" });
    }

    console.log("Query results:", results);

    if (results.length > 0) {
      const user = results[0];

      // Generate JWT token with user ID and role
      const token = jwt.sign(
        { id: user.Id, role: user.role }, // Payload (user details)
        process.env.JWT_SECRET, // Secret key from .env file
        { expiresIn: "1h" } // Token expiration time
      );

      // Return the token along with user details
      return res.status(200).json({
        message: "Login successful",
        user: { id: user.Id, email: user.email, role: user.role },
        token,
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  });
};

module.exports = { postSignUp, postSignIn };
