const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;

  const user = await User.findById(request.decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  savedBlog.populate("user", )
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save({ username: 1, name: 1 });
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const userId = request.decodedToken.id;

  const blog = await Blog.findById(request.params.id);
  if (blog.user.toString() === userId.toString()) {
    await Blog.remove(blog);
    response.status(204).end();
  } else {
    response.status(403).json({ error: "invalid user" });
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const blog = {
    likes: request.body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate("user", { username: 1, name: 1 })
  response.status(200).json(updatedBlog);
});
module.exports = blogsRouter;
