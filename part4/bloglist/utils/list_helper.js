const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prevBlog, currentBlog) => {
    if (!prevBlog || prevBlog.likes < currentBlog.likes) {
      return currentBlog
    } else {
      return prevBlog
    }
  }, null)
}

const mostBlogs = (blogs) => {
  const groupedBlogs = _.groupBy(blogs, 'author')
  const authorWithBlogCounts = _.mapValues(groupedBlogs, group => group.length)
  const mostBlogEntry = _.maxBy(_.entries(authorWithBlogCounts), ([_, count]) => count)

  if (!mostBlogEntry) {
    return {
      author: '',
      blogs: 0
    }
  }

  return {
    author: mostBlogEntry[0],
    blogs: mostBlogEntry[1]
  }
}

const mostLikes = (blogs) => {
  const groupedBlogs = _.groupBy(blogs, 'author')
  const authorsWithLikes = _.mapValues(groupedBlogs, group => _.sumBy(group, 'likes'))
  const mostLikesEntry = _.maxBy(_.entries(authorsWithLikes), ([_, likes]) => likes)

  if (!mostLikesEntry) {
    return {
      author: '',
      likes: 0
    }
  }

  return {
    author: mostLikesEntry[0],
    likes: mostLikesEntry[1]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
