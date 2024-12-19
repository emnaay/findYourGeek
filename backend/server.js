const express = require("express");
const cors = require("cors");
const db = require("./database/db");

const app = express();

app.use(express.json());
app.use(cors());

// Import and use routes
const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/dashboard", dashboardRoutes);

// Other routes (users, projects, etc.)
const usersRoutes = require("./routes/usersRoutes");
app.use("/users", usersRoutes);

const projectsRouter = require("./routes/projectRoutes");
app.use("/projects", projectsRouter);

const portfolioRouter = require("./routes/portfolioRoute");
app.use("/portfolio", portfolioRouter);

app.listen(8081, () => {
  console.log("Server is listening on port 8081");
});
