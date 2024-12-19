const express = require("express");
const cors = require("cors");
const db = require("./database/db"); // Import shared db connection

const app = express();

app.use(express.json());
app.use(cors());

app.listen(8081, () => {
  console.log("Server is listening on port 8081");
});

const messageRouter= require("./routes/messageRoutes");
app.use("/", messageRouter);


// Import and use routes
const projectsRouter = require("./routes/projectRoutes");
app.use("/projects", projectsRouter);

const usersRoutes = require("./routes/usersRoutes");
app.use("/users", usersRoutes);

const portfolioRoutes = require("./routes/portfolioRoute");
app.use("/portfolio", portfolioRoutes);

const signRoutes = require("./routes/signRoute");
app.use("/api", signRoutes);

//const postLogIn = require("./routes/signRoute");
//app.post("/login", postLogIn);

//const postSignIn = require("./routes/signRoute");
//app.post("/signIn", postSignIn);


app.get("/", (req, res) => {
  return res.json("From backend side");
});

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

