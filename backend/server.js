import express from "express";
import cors from "cors";
import todoRouter from "./routes/todo.js";
import authMiddleware from "./middleware/auth.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/todos", authMiddleware, todoRouter);

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
