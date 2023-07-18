import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import dotenv from "dotenv";
import user from "./routes/User.js";
import product from "./routes/Product.js";
import order from "./routes/Order.js";
import payment from "./routes/Payment.js";

const app = express();

// dotenv configuration
dotenv.config({ path: "backend/.env" });

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  fileUpload({
    limits: {
      fileSize: 50 * 1024 * 1024,
    },
    useTempFiles: true,
  })
);
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "Backend is working fine check your frontend in http://localhost:5173",
  });
});
// routes
app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", order);
app.use("/api/v1", payment);

export default app;
