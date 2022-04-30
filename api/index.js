import { errorHandler } from "./common";
import MongoDBConnect from "./utils/connect.mongoose";
import "express-async-errors";

// import { imgurUploadImg } from "./routes/data/imgurUploadImg";
// import { googleDriveUploadImg } from "./routes/data/googleDriveUploadImg";
// import { getAllUsers } from "./routes/data/getAllUsers";
// import { sortUsersByDate } from "./routes/data/sortUsersByDate";

import { signupRouter } from "./routes/auth/signup";
import { signoutRouter } from "./routes/auth/signout";
import { sighInRouter } from "./routes/auth/signin";

import { inputEmailAndSendRouter } from "./routes/restoreAccess/inputEmailAndSend";
// import { changePasswordRouter } from './routes/profile/myProfile/changePassword'
import { changePasswordByEmailRouter } from "./routes/restoreAccess/newPassword";
import { chekCodeEmail } from "./routes/restoreAccess/chekCodeEmail";
import { EmailShareInt } from "./routes/restoreAccess/EmailShareInt";

import { aboutMeRouter } from "./routes/personal/aboutMe";
import { updateMePassword } from "./routes/personal/updateMePassword";

import { BuyRouts } from "./routes/profile/user/BuyRouts";
import { ordersRouts } from "./routes/profile/user/ordersRouts";

import { mainGlobal } from "./routes/profile/global/mainGlobal";
// import { add } from "./routes/profile/partner/add";
// import { get_points } from "./routes/profile/partner/get_points";
// import { images } from "./routes/profile/partner/images";

// import { createOrder } from "./routes/profile/user/createOrder";
// import { nearPoint } from "./routes/profile/user/nearPoint";
// import { getMapPointsAll } from "./routes/profile/user/getMapPointsAll";

// import { orders } from "./routes/profile/admin/orders";
// import { setOrderStatus } from "./routes/profile/admin/setOrderStatus";
import { getUsersListRouter } from "./routes/profile/admin/getAllUsers";
// import { uploadKML } from "./routes/profile/admin/uploadKML";
// import { PointsSort } from "./routes/profile/admin/PointsSort";
// import { uploadBrands } from "./routes/profile/admin/uploadBrands";
// import { getConfig } from "./routes/profile/admin/getConfig";
// import { newblog } from "./routes/profile/admin/blog/new";
import { GdsRouts } from "./routes/profile/admin/GdsRouts";

import { ConfigRouts } from "./routes/profile/admin/ConfigRouts";
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cookieSession = require("cookie-session");

// app.get("/", (req, res) => {
//   res.send("<h1>Hey</h1>");
// });
// const io = new Server(server, {
//   cors: {
//     origins: ["http://localhost:4500", "https://get-man.com"],
//   },
//   resource: "/api/ws",
//   path: "/api/ws",
// });
// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });
// const http = require("http");
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);
// console.log(io);
// app.use("/ws", (req, res) => {
//   io.on("connection", (socket) => {
//     console.log("a user connected");
//     socket.on("disconnect", () => {
//       console.log("user disconnected");
//     });
//   });
// });
// let server = null;
// let io = null;
// let server = null;
// let io = null;
// console.log(server);
// const socket = require("socket.io");
// app.use("/ws", (req, res) => {
// if (server !== null) {

// server = res.connection.server;
// // console.log("server", server);
// io = socket(server);

// io.on("connection", function (socket) {
//   console.log("Made socket connection");

//   socket.on("msg", (msg) => {
//     console.log("Recived: " + msg);

//     setTimeout(() => {
//       socket.emit("msg", `Response to: ${msg}`);
//     }, 1000);
//   });

//   socket.on("disconnect", () => console.log("disconnected"));
// });
// }
// const http = require("http");
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

// app.use("/ws", (req, res) => {
//   io.on("connection", (socket) => {
//     console.log("a user connected");
//     socket.on("disconnect", () => {
//       console.log("user disconnected");
//     });
//   });
// });
// res.json({ msg: "server is set" });
// });
// io.of("/api").on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });
//   res.json({ suka: 123 });

require("dotenv").config();
// const server = http.createServer(app);
// const io = require("socket.io").listen(server);
// var server = http.createServer(app);
// var io = require("socket.io")(server, { path: "/sockets" }).listen(server);
// app.set("socketio", io);
// const server = require("http").createServer(app);
// const io = require("socket.io")(server);
// // var server = require("http").createServer(app);
// // var io = require("socket.io")(server).listen(server);

// io.on("connection", function (socket) {
//   console.log("IO Connected");

//   socket.on("msg", (msg) => {
//     console.log("Recived: " + msg);

//     setTimeout(() => {
//       socket.emit("msg", `Response to: ${msg}`);
//     }, 1000);
//   });

//   socket.on("disconnect", () => console.log("disconnected"));
// });

// const server = require("http").createServer(app);

// const io = require("socket.io")(server);

// let userSocket = {};
// io.on("connection", function (socket) {
//   console.log("a user connected");
//   socket.on("msg", (val) => {
//     console.log(val);
//   });
//   socket.on("new user", (username) => {
//     socket.username = username;
//     userSocket[username] = socket;
//   });
//   socket.on("send message", (res) => {
//     console.log(res.recipient in userSocket);
//     if (res.recipient in userSocket) {
//       userSocket[res.recipient].emit("receiveMessage", res);
//     }
//     //userSocket[res.recipient].emit('recevieMessage',res)
//   });
// });

app.all("*", function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "https://get-man.com");
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  // res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
// app.all("/ws", (req, res) => {
// const io = require("socket.io")(server);

//   res.json("123");
// });
// app.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:8081",
//   })
// );
// app.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:8081",
//   })
// );
// let whitelist = [
//   "http://localhost:8081",
//   "http://localhost:8080",
//   "http://localhost:4500",
//   "http://localhost:4600",
//   "https://get-man.com",
//   "https://api.get-man.com",
// ];
// app.use(
//   cors({
//     credentials: true,
//     origin: function (origin, callback) {
//       // allow requests with no origin
//       if (!origin) return callback(null, true);
//       if (whitelist.indexOf(origin) === -1) {
//         var message = "Idi na xui";
//         return callback(new Error(message), false);
//       }
//       return callback(null, true);
//     },
//   })
// );
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("trust proxy", true);
app.use(cookieParser());
app.use(
  cookieSession({
    signed: false,
  })
);
app.use(signupRouter);
app.use(sighInRouter);
app.use(signoutRouter);

app.use(inputEmailAndSendRouter);
app.use(changePasswordByEmailRouter);
// app.use(changePasswordRouter)
app.use(chekCodeEmail);
app.use(EmailShareInt);

app.use(aboutMeRouter);
app.use(updateMePassword);

app.use(GdsRouts);

app.use(mainGlobal);

app.use(ConfigRouts);

app.use(BuyRouts);
app.use(ordersRouts);
// app.use(add);
// app.use(get_points);
// app.use(images);

// app.use(createOrder);
// app.use(nearPoint);
// app.use(getMapPointsAll);

// app.use(orders);
// app.use(setOrderStatus);
app.use(getUsersListRouter);
// app.use(uploadKML);
// app.use(PointsSort);
// app.use(uploadBrands);
// app.use(getConfig);
// app.use(newblog);
app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  try {
    await MongoDBConnect();
  } catch (err) {
    console.error(err);
  }
};
start();

module.exports = app;

// Start standalone server if directly running+
// if (require.main === module) {
//   const port = process.env.PORT || 3001;
//   app.listen(port, () => {
//     console.log(`API server listening on port ${port}`);
//   });
// }
// app.listen(5050)
