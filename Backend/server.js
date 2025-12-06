const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


dotenv.config();

// connection bl mongodb
connectDB();

const app = express();

// Autoriser les requêtes depuis le navigateur (important pour front-end)
app.use(cors());


app.use(express.json());

// Route  test
app.get("/", (req, res) => {
  res.send("API Express + MongoDB fonctionne 🎉");
});

// Routes API
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/tasks", require("./routes/tasks"));

// na3tiw l port li bch nconectiw 3lih
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur connectée sur ${PORT}`);
});