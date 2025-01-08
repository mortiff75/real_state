import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Routes
import postRouter from "./routes/post.route.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import messageRouter from "./routes/message.router.js";
import chatsRouter from "./routes/chats.router.js";

const PORT = 4000;

const app = express();
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "*",
//     credentials: true,
//   })
// );

// app.use("/api/auth", authRouter);
// app.use("/api/users", userRouter);
// app.use("/api/posts", postRouter);
// app.use("/api/chats", chatsRouter);
// app.use("/api/message", messageRouter);

app.get("/", (req, res) => {
  res.json({ message: "Success" });
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
