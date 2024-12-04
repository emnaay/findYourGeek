const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

//changing the data form to .json
app.use(express.json());

app.use(cors());

const projectsRouter = require("./routes/projectRoutes");
app.use("/projects", projectsRouter);

const getProjectById = require("./routes/projectRoutes");
app.use("/projects/:userID", getProjectById);

const postNewProject = require("./routes/projectRoutes");
app.use("/newProject", postNewProject);

const usersRoutes = require("./routes/usersRoutes");
app.use("/users", usersRoutes);

const getUserById = require("./routes/usersRoutes");
app.use("/users/:Id", getUserById);


const getPortfolio = require("./routes/portfolioRoute");
app.use("/portfolio", getPortfolio);

const getPortfolioById = require("./routes/portfolioRoute");
app.use("/portfolio/:userID", getPortfolioById);

const postSignUp = require("./routes/signRoute");
app.use("/signup", postSignUp);

const postLogIn = require("./routes/signRoute");
app.use("/login", postLogIn);

const db = mysql.createConnection({
  host: "localhost",
  port: "3308",
  user: "root",
  password: "",
  database: "findyourgeekdb",
});

app.get("/", (req, res) => {
  return res.json("From backend side");
});

// app.get("/users", (req, res) => {
//   const sql = "SELECT * FROM users";
//   db.query(sql, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

// app.get("/portfolio", (req, res) => {
//   const sql = `
//     SELECT portfolio.*, users.userName 
//     FROM portfolio 
//     JOIN users ON portfolio.userID = users.Id;
//   `;
//   db.query(sql, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

// app.get("/projects", (req, res) => {
//   const sql = `
//   SELECT projects.*, users.userName
//   FROM projects
//   JOIN users ON projects.userID = users.Id;
// `;
//   db.query(sql, (err, data) => {
//     if (err) return res.json(err);

//     return res.json(data);
//   });

// });

// app.get("/users/:Id", (req, res) => {
//   const Id = req.params.Id;
//   const sql = "SELECT * FROM users WHERE Id = ?";

//   db.query(sql, [Id], (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

// portfolio mtaa el id el fleni
// app.get("/portfolio/:userID", (req, res) => {
//   const userID = req.params.userID;
//   const sql = "SELECT * FROM portfolio WHERE userID = ?";

//   db.query(sql, [userID], (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

//project li userID postehom bch yet5edmou
// app.get("/projects/:userID", (req, res) => {
//   const userID = req.params.userID;
//   const sql = "SELECT * FROM projects WHERE userID = ?";

//   db.query(sql, [userID], (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

//sign up (cheking is the user exist)

/*/ app.post('/users' , (req , res)=> {
    const sql = "SELECT * FROM users WHERE userName = ? AND password = ? ";
   
    db.query(sql, [ req.body.username, req.body.password], (err, data)=> {
        if(err) return res.json("ERROR");
        if(data.length > 0){
            return res.json("Login Successfully");
        }else{
          
            return res.json("No Record")
        }
        
    })
})/*/

// Sign-up endpoint: adds new user to database
// app.post("/signup", (req, res) => {
//   const { username, password, email } = req.body;
//   const checkUserSql = "SELECT * FROM users WHERE userName = ?";
//   db.query(checkUserSql, [username], (err, data) => {
//     if (err) return res.json("ERROR");
//     if (data.length > 0) {
//       return res.json({ status: "User already exists" });
//     } else {
//       const insertUserSql =
//         "INSERT INTO users (userName, password, email) VALUES (?, ?, ?)";
//       db.query(insertUserSql, [username, password, email], (err, result) => {
//         if (err) return res.json("ERROR");
//         return res.json({
//           status: "Sign Up Successful",
//           user: { username, email },
//         });
//       });
//     }
//   });
// });

// Login endpoint: checks if user exists with given credentials
// app.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   const sql = "SELECT * FROM users WHERE userName = ? AND password = ?";
//   db.query(sql, [username, password], (err, data) => {
//     if (err) return res.json("ERROR");
//     if (data.length > 0) {
//       return res.json({ status: "Login Successful", user: data[0] }); // Send user data to frontend
//     } else {
//       return res.json({ status: "Invalid credentials" });
//     }
//   });
// });


//adding a new project

// app.post("/newProject", (req, res) => {
//   const { projectName, userID, description, skills_needed, price } = req.body;
//   const checkProjectSql = "SELECT * FROM projects WHERE projectName = ?";
//   db.query(checkProjectSql, [projectName], (err, data) => {
//     if (err) return res.json("ERROR");
//     if (data.length > 0) {
//       return res.json({ status: "Project Title alredy used" });
//     } else {
//       console.log("added");
//       const insertProjectSql =
//         "INSERT INTO projects (projectName, userID,  description, skills_needed, price) VALUES (?, ?, ?, ?, ?)";
//       db.query(insertProjectSql, [projectName, userID, description, skills_needed, price], (err, result) => {
//         if (err) return res.json("ERROR");
//         return res.json({
//           status: "Project Added",
          
//           project: { projectName, userID, description, skills_needed, price },
//         });
//       });
//     }
//   });
// });
//chatt li loutaa
// app.post("/newProject", (req, res) => {
//   const { projectName, userID, description, skills_needed, price } = req.body;
 
//   // Log incoming request body
//   console.log("Received new project data:", req.body);

//   const checkProjectSql = "SELECT * FROM projects WHERE projectName = ?";
//   db.query(checkProjectSql, [projectName], (err, data) => {
//     if (err) {
//       console.error("Error checking project existence:", err);
//       return res.status(500).json("ERROR"); // Explicit error code
//     }

//     if (data.length > 0) {
//       console.log("Project title already exists:", projectName);
//       return res.json({ status: "Project Title already used" });
//     } else {
//       console.log("Adding new project...");
//       const insertProjectSql =
//         "INSERT INTO projects (projectName, userID, description, skills_needed, price) VALUES (?, ?, ?, ?, ?)";
//       db.query(
//         insertProjectSql,
//         [projectName,userID, description, skills_needed, price],
//         (err, result) => {
//           if (err) {
//             console.error("Error inserting new project:", err);
//             return res.status(500).json("ERROR"); // Explicit error code
//           }

//           console.log("Project added successfully:", {
//             projectName,
//             userID,
//             description,
//             skills_needed,
//             price,
//           });
//           console.log("Received data on the server:", req.body);
//           return res.json({
//             status: "Project Added",
//             project: { projectName, userID, description, skills_needed, price },
//           });
//         }
//       );
//     }
//   });
// });

app.delete('/projects/:projectID', (req, res) => {
  const projectId = req.params.projectID;

  const sql = 'DELETE FROM projects WHERE projectID = ?'; 
  db.query(sql, [projectId], (err, result) => {
      if (err) {
          console.error('Error deleting project:', err);
          res.status(500).send({ message: 'Failed to delete project' });
      } else {
          res.status(200).send({ message: 'Project deleted successfully' });
      }
  });
});

app.listen(8081, () => {
  console.log("Server is listening on port 8081");
});
