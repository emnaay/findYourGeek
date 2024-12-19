const db = require("../database/db");

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

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  console.log("Executing query:", query, email, password);

  // Using the query method from mysql
  db.query(query, [email, password], (error, results) => {
    if (error) {
      console.error("Error during sign-in:", error);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length > 0) {
      return res.status(200).json({ message: "Login successful", user: results[0] });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  });
};

module.exports = { postSignUp, postSignIn };
