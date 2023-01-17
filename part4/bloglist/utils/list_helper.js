const _ = require("lodash");
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, current) => total + current.likes, 0);
};

const favouriteBlog = (blogs) => {
  return blogs.reduce((max, current) =>
    max.likes > current.likes ? max : current
  );
};

const mostBlogs = (blogs) => {
  const authorCounts = _.countBy(blogs, "author");
  const most = _.maxBy(_.keys(authorCounts), function (o) {
    return authorCounts[o];
  });
  return { author: most, blogs: authorCounts[most] };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
};
