const _ = require('lodash')
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, current) => total + current.likes, 0)
}

const favouriteBlog = (blogs) => {
  return blogs.reduce((max, current) =>
    max.likes > current.likes ? max : current
  )
}

const mostBlogs = (blogs) => {
  const authorCounts = _.countBy(blogs, 'author')
  const most = _.maxBy(_.keys(authorCounts), function (o) {
    return authorCounts[o]
  })
  return { author: most, blogs: authorCounts[most] }
}

const mostLikes = (blogs) => {
  const authorLikes = _.reduce(
    blogs,
    function (result, blog) {
      result[blog.author] = (result[blog.author] || 0) + blog.likes
      return result
    },
    {}
  )
  const most = _.maxBy(_.keys(authorLikes), function (o) {
    return authorLikes[o]
  })
  return { author: most, likes: authorLikes[most] }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
}
