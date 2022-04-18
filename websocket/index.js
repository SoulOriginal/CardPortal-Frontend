import { Server } from "socket.io";
import express from "express";
import { createServer } from "http";
import logger from "morgan";
import BlogSchema from "../models/blog/index.js";
import BlogCommentSchema from "../models/blog/comment.model.js";
import MongoDBConnect from "../api/utils/connect.mongoose.js";
// import mongoose from "mongoose";
import UsersDB from "./users.js";
const usersDB = new UsersDB();
import pkg from "mongodb";
const { ObjectId } = pkg;
// console.log(mongoose.connection.readyState);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origins: ["http://localhost:4500", "https://get-man.com"],
  },
  path: "/ws/tt",
});

// const io = IoModule(http, {
//   cors: {
//     origins: ["http://localhost:4500"],
//   },
// });
app.use(logger("dev"));
// app.use(errorHandler);
app.get("/z", (req, res) => {
  res.send("<h1>Hey Socket.io v2</h1>");
});
class Message {
  constructor(name, text, id, userID) {
    this.name = name;
    this.text = text;
    this.id = id;
    this.userID = userID;
    this.time = new Date().toString().slice(15, 24);
  }
}

io.on("connection", (socket) => {
  socket.on("createUser", (user) => {
    console.log("createUser", user);
    usersDB.addUser({
      ...user,
      id: socket.id,
    });

    return { id: socket.id };
  });

  socket.on("joinRoom", async ({ name, room }) => {
    console.log("room", room);
    socket.join(room);
    io.to(room).emit("updateUsers", usersDB.getUsersByRoom(room));
    const resNear = await BlogSchema.aggregate([
      { $match: { _id: new ObjectId(room) } },

      {
        $project: {
          comments: 1,
        },
      },
      { $unwind: "$comments" },
      {
        $set: { userIDs: { $toObjectId: "$comments.userID" } },
      },
      {
        $lookup: {
          from: "users",
          localField: "userIDs",
          foreignField: "_id",
          as: "some_user",
        },
      },
      { $unwind: "$some_user" },

      {
        $set: { name: "$some_user.email" },
      },

      { $replaceRoot: { newRoot: { $mergeObjects: ["$comments", "$$ROOT"] } } },
      { $project: { comments: 0 } },
      { $unset: ["some_user", "userIDs"] },
    ]);
    io.to(room).emit("updateMassages", resNear);
    socket.emit("newMessage", new Message("admin", `Hello, ${name}`));
    socket.broadcast
      .to(room)
      .emit(
        "newMessage",
        new Message("admin", `User ${name} connected to chat`)
      );
  });
  socket.on("uploadMassages", async ({ skip, id }) => {
    console.log("roomskip", skip, id);
    const user = usersDB.getUser(id);
    console.log(user);
    socket.join(user.room);

    const resNear = await BlogSchema.aggregate([
      { $match: { _id: new ObjectId(user.room) } },

      {
        $project: {
          comments: 1,
        },
      },
      { $unwind: "$comments" },
      {
        $set: { userIDs: { $toObjectId: "$comments.userID" } },
      },
      {
        $lookup: {
          from: "users",
          localField: "userIDs",
          foreignField: "_id",
          as: "some_user",
        },
      },
      { $unwind: "$some_user" },

      {
        $set: { name: "$some_user.email" },
      },
      { $replaceRoot: { newRoot: { $mergeObjects: ["$comments", "$$ROOT"] } } },
      { $project: { comments: 0 } },
      { $unset: ["some_user", "userIDs"] },
      { $skip: skip },
      { $limit: 25 },
    ]);
    io.to(user.room).emit("uploadMassages", resNear);
    // socket.emit("newMessage", new Message("admin", `Hello, ${name}`));
    // socket.broadcast
    //   .to(room)
    //   .emit(
    //     "newMessage",
    //     new Message("admin", `User ${name} connected to chat`)
    //   );
  });
  socket.on("createMessage", async ({ id, msg, userID, postID }) => {
    console.log("createMessage", id, msg);
    const user = usersDB.getUser(id);
    const nMsg = new BlogCommentSchema({
      text: msg,
      userID,
    });

    const emsg = await BlogSchema.findOneAndUpdate(
      { _id: new ObjectId(postID) },
      {
        $push: {
          comments: nMsg,
        },
      }
    );
    console.log("createMessage", nMsg);

    if (user) {
      io.to(user.room).emit(
        "newMessage",
        new Message(user.name, msg, id, user.userID)
      );
    }
  });

  socket.on("setTypingStatus", ({ room, typingStatus, id }) => {
    console.log("setTypingStatus", room, typingStatus, id);
    usersDB.setTypingStatus(id, typingStatus);
    io.to(room).emit("updateUsers", usersDB.getUsersByRoom(room));
  });

  const exitEvents = ["leftChat", "disconnect"];

  exitEvents.forEach((event) => {
    socket.on(event, () => {
      console.log("event", event);
      const id = socket.id;
      const user = usersDB.getUser(id);
      if (!user) return;
      const { room, name } = user;
      usersDB.removeUser(id);
      socket.leave(room);
      io.to(room).emit("updateUsers", usersDB.getUsersByRoom(room));
      io.to(room).emit(
        "newMessage",
        new Message("admin", `User ${name} left chat`)
      );
    });
  });
});
// require("dotenv").config();

import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const start = async () => {
  try {
    await MongoDBConnect();
  } catch (err) {
    console.error(err);
  }
};
start();
export default app;
const port = process.env.PORT;
server.listen(4500, "localhost", () => {
  console.log("listening 13odn1 *:3000");
});
