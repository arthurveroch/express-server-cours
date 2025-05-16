const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const userRouter = require("./routes/user.routes");

app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur mon serveur Express" });
});

app.listen(PORT, () => {});
