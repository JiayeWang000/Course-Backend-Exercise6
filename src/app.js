const express = require("express");
const connectToDatabase = require("./config/db");
const eventRoutes = require("./routes/events");
const authRoutes = require("./routes/auth");

const app = express();
const port = 3000;

app.use(express.json());
app.use("/items", eventRoutes);
app.use("/auth", authRoutes);
const startServer = async () => {
  await connectToDatabase();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};


startServer();

app.use((req, res) => {
    res.status(404).send("Not Found");
  });