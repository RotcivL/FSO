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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
