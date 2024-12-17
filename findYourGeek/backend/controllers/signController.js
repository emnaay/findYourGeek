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

const postLogIn = (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE userName = ? AND password = ?";
    db.query(sql, [username, password], (err, data) => {
      if (err) return res.json("ERROR");
      if (data.length > 0) {
        return res.json({ status: "Login Successful", user: data[0] }); // Send user data to frontend
      } else {
        return res.json({ status: "Invalid credentials" });
      }
    });
  };

  module.exports = { postSignUp, postLogIn };