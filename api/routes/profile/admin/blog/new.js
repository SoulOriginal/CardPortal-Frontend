import express from "express";
import { validateRequest } from "../../../../common/middlewares/validate-request";
import { requireAuth } from "../../../../common/middlewares/require-auth";
import { currentUser } from "../../../../common/middlewares/current-user";
import { ObjectId } from "mongodb";
const Blog = require("../../../../../models/blog/index");
const router = express.Router();

router.post(
  "/admin/blog",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    try {
      const { title, body } = req.body;
      const { id, role } = req.currentUser;

      if (role == "admin") {
        const nBlog = new Blog({ title, body, author_id: id });
        await nBlog.save();
        if (!nBlog) {
          res.status(400).json({ payload: "Error save User" });
          return;
        }
        res.status(200).json({ payload: "ok" });
      } else {
        res.status(400).json({ payload: "You have no access" });
      }
    } catch (error) {
      res.json({ payload: error });
    }
  }
);
router.get(
  "/blog",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    try {
      const { id, role } = req.currentUser;
      const { page = 1, limit = 10 } = req.query;

      const blogPosts = await Blog.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ _id: -1 })
        .exec();
      const count = await Blog.countDocuments();
      res.json({
        blogPosts,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } catch (error) {
      res.json({ payload: error });
    }
  }
);
router.get(
  "/blog/:id",
  validateRequest,
  currentUser,
  requireAuth,
  async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      const data = await Blog.findById(id).then((doc) => {
        doc.views++;
        doc.save();
        res.json({
          doc,
        });
      });
    } catch (error) {
      res.json({ payload: error });
    }
  }
);
export { router as newblog };
