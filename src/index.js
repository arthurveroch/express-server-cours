const express = require("express");
const app = express();

app.use(express.json());

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const userRouter = require("./routes/user.routes");

app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur mon serveur Express" });
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
