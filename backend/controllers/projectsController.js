const db = require("../database/db");

const getProjects = (req, res) => {
  const sql = `
    SELECT projects.*, users.userName 
    FROM projects 
    JOIN users ON projects.userID = users.Id;
  `;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

const getProjectById = (req, res) => {
  const userID = req.params.userID;
  const sql = "SELECT * FROM projects WHERE userID = ?";

  db.query(sql, [userID], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

const postNewProject = (req, res) => {
  const { projectName, userID, description, skills_needed, price } = req.body;
  const checkProjectSql = "SELECT * FROM projects WHERE projectName = ?";
  db.query(checkProjectSql, [projectName], (err, data) => {
    if (err) return res.json("ERROR");
    if (data.length > 0) {
      return res.json({ status: "Project Title alredy used" });
    } else {
      console.log("added");
      const insertProjectSql =
        "INSERT INTO projects (projectName, userID,  description, skills_needed, price) VALUES (?, ?, ?, ?, ?)";
      db.query(insertProjectSql, [projectName, userID, description, skills_needed, price], (err, result) => {
        if (err) return res.json("ERROR");
        return res.json({
          status: "Project Added",
          
          project: { projectName, userID, description, skills_needed, price },
        });
      });
    }
  });
};

module.exports = { getProjects, getProjectById, postNewProject};
