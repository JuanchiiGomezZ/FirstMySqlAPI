import express from "express";
import morgan from "morgan";

import indexRoutes from "./routes/index.routes.js";

import usersRouter from "./routes/users.routes.js";

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/", indexRoutes);
app.use("/api", usersRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
});

export default app;
