const mongoose = require("mongoose");
const supertest = require("supertest");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");
const User = require("../models/user");
const blog = require("../models/blog");

let token;
beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("secret", 10);
  const user = new User({ username: "root", name: "super", passwordHash });
  await user.save();

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  token = jwt.sign(userForToken, process.env.SECRET);

  await Blog.deleteMany({});
  blogs = helper.initialBlogs.map(
    (blog) => new Blog({ ...blog, user: user.id })
  );
  await Blog.insertMany(blogs);
});

test("correct number of blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("id property exists", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "new blog",
    author: "RotcivL",
    url: "https://newblogrotcivl.com",
    likes: 0,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const blogsNoId = blogsAtEnd.map(({ id, user, ...others }) => others);
  expect(blogsNoId).toContainEqual(newBlog);
});

test("a valid blog can not be added when no token is provided", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const newBlog = {
    title: "new blog",
    author: "RotcivL",
    url: "https://newblogrotcivl.com",
    likes: 0,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(401)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toEqual(blogsAtStart);
});

test("default likes to 0 if property is missing", async () => {
  const newBlog = {
    title: "new blog",
    author: "RotcivL",
    url: "https://newblogrotcivl.com",
  };

  const response = await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  expect(response.body.likes).toBeDefined();
});

test("blog without title is not added", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const newBlog = {
    url: "https://newblogrotcivl.com",
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(newBlog)
    .expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toEqual(blogsAtStart);
});

test("blog without url is not added", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const newBlog = {
    title: "new blog",
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(newBlog)
    .expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toEqual(blogsAtStart);
});

test("a blog can be deleted", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set("Authorization", `bearer ${token}`)
    .expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
  expect(blogsAtEnd).not.toContainEqual(blogToDelete);
});

test("a blog can be updated", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];

  const updatedBlog = {
    ...blogToUpdate,
    likes: blogToUpdate.likes + 1,
  };

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toContainEqual(updatedBlog);
});

afterAll(() => {
  mongoose.connection.close();
});
