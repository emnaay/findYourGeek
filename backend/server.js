const express = require("express");
const cors = require("cors");
const db = require("./database/db"); // Import shared db connection

const app = express();

app.use(express.json());
app.use(cors());

// Import and use routes
const projectsRouter = require("./routes/projectRoutes");
app.use("/projects", projectsRouter);

const usersRoutes = require("./routes/usersRoutes");
app.use("/users", usersRoutes);

const portfolioRoutes = require("./routes/portfolioRoute");
app.use("/portfolio", portfolioRoutes);

const signRoutes = require("./routes/signRoute");
app.use("/signup", signRoutes);
app.use("/login", signRoutes);

app.get("/", (req, res) => {
  return res.json("From backend side");
});

// Start server
app.listen(8081, () => {
  console.log("Server is listening on port 8081");
});
