const db = require("../database/db");

const Application = {
  getAll: (callback) => {
    const sql =`
          SELECT 
            applications.*, 
            users.userName, 
            projects.projectName
          FROM 
              applications
          JOIN 
              users ON applications.userID = users.id
          JOIN 
              projects ON applications.projectID = projects.projectID;

  `;
    db.query(sql, callback);
  },


  getByProjectId: (projectID, callback) => {
    const sql = `
            SELECT 
            applications.*, 
            users.userName, 
            projects.projectName
        FROM 
            applications
        JOIN 
            users ON applications.userID = users.id
        JOIN 
            projects ON applications.projectID = projects.projectID
        WHERE 
            applications.projectID = ?;  `;
    db.query(sql, [projectID], callback);
  },


create: (applicationData, callback) => {
  const sql = "INSERT INTO applications (userID, projectID, price_proposed, application_letter) VALUES (?, ?, ? , ? )";
  
  const { userID, projectID, price_proposed, application_letter } = applicationData;
  db.query(sql, [userID, projectID, price_proposed, application_letter], callback);
},
 
 



};

module.exports = Application;
