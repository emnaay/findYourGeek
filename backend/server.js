const express = require("express");
const cors = require("cors");
const db = require("./database/db");

const app = express();

app.use(express.json());
app.use(cors());

// Import and use routes
const messageRouter = require("./routes/messageRoutes");
app.use("/", messageRouter);

const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/dashboard", dashboardRoutes);

const usersRoutes = require("./routes/usersRoutes");
app.use("/users", usersRoutes);

const projectsRouter = require("./routes/projectRoutes");
app.use("/projects", projectsRouter);

const signRoutes = require("./routes/signRoute");
app.use("/api", signRoutes);

const contactsRoutes = require("./routes/contactsRoutes");
app.use("/contacts", contactsRoutes);

const portfolioRouter = require("./routes/portfolioRoute");
app.use("/portfolio", portfolioRouter);

// Root route
app.get("/", (req, res) => {
  return res.json("From backend side");
});

// DELETE route for projects
app.delete("/projects/:projectID", (req, res) => {
  const projectId = req.params.projectID;

  const sql = "DELETE FROM projects WHERE projectID = ?";
  db.query(sql, [projectId], (err, result) => {
    if (err) {
      console.error("Error deleting project:", err);
      res.status(500).send({ message: "Failed to delete project" });
    } else {
      res.status(200).send({ message: "Project deleted successfully" });
    }
  });
});

// Start server
app.listen(8081, () => {
  console.log("Server is listening on port 8081");
});
