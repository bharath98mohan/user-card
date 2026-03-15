const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/userRoutes");
const errorHandling = require("./middleware/errorHandling");
const PORT = 8000;

app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api", router);

app.use(errorHandling);

app.listen(PORT || 8000, () =>
  console.log(`Server listening on http://localhost:${PORT}/api/users`),
);

//http://localhost:8000/api/users
