import express from "express";
import morgan from "morgan";
import process from "node:process";
import path from "node:path";
import { sequelize } from "./models/index.js";
import apiRouter from './routes/index.js';
import cors from "cors";
import cookieParser from "cookie-parser"

const app = express();
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(express.json());
app.use(cookieParser()); // allow reading cookies
app.use(cors({
  origin: `${FRONTEND_URL}`,
  credentials: true
})); // whitelist api connections

// routes
app.use('/api', apiRouter);

app.use('/', (req, res) => {
  res.send("API is running.");
});

// add http request logging to help us debug and audit app use
const logFormat = app.get("env") === "production" ? "combined" : "dev";
app.use(morgan(logFormat));

// load our controller routes at /api
// app.use("/api", apiRouter);

// // for production use, we serve the static react build folder
// if (process.env.NODE_ENV === "production") {
//   app.use(
//     express.static(path.join(import.meta.dirname, "../client/dist"))
//   );

//   // all unknown routes should be handed to our react app
//   app.get("*", function (req, res) {
//     res.sendFile(
//       path.join(import.meta.dirname, "../client/dist", "index.html")
//     );
//   });
// }

// 404 route
app.use((req, res) => {
  res.status(404);
  res.json({
    error: "Not Found",
  });
});

// Error route: catches all errors
app.use(function (err, req, res, next) {
  console.error(err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500);
  res.json({
    error: {
      code: err.status || 500,
      message: err.message,
    },
  });
  next();
});

// start database
await sequelize.sync({ force: false });

// start server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
