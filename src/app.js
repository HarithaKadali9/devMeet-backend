require('dotenv').config(); // ✅ Load environment variables

const express = require("express");
const cors = require("cors");
const connectdb = require("./config/database");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(cors({
  origin: 'https://devmeetplatform.netlify.app/', // ✅ Change this to your frontend domain after deploying
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
const authRouter = require("./Routes/auth");
const profileRouter = require("./Routes/profile");
const requestRouter = require("./Routes/request");
const userRoute = require("./Routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRoute);

// Connect to Database and Start Server
connectdb()
  .then(() => {
    console.log("Database connected successfully");

    const PORT = process.env.PORT || 3344; // ✅ Use 3344 locally, dynamic PORT on Vercel
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
