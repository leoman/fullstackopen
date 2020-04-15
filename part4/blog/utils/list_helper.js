// eslint-disable-next-line no-unused-vars
const dummy = blogs => 1

const totalLikes = blogs => blogs.reduce((prev, curr) => prev + curr.likes, 0)

const favoriteBlog = blogs => {
  const fav = blogs.reduce((prev, curr) => prev.likes > curr.likes ? prev : curr, { likes: 0 })

  if (fav.likes > 0) {
    const { title, author, likes } = fav
    return {
      title,
      author,
      likes
    }
  }
  return null
}

const mostBlogs = blogs => {
  const sortedBlogs = blogs.reduce((prev, curr) => {
    const number = prev[curr.author] ? prev[curr.author] + 1 : 1
    return {
      ...prev,
      [curr.author]: number
    }
  }, {})

  return Object.entries(sortedBlogs).reduce((prev, [key, value]) => {

    return value > prev.blogs ? { author: key, blogs: value } : prev

  }, { blogs: 0 })
}

const mostLikes = blogs => {
  const sortedLikes = blogs.reduce((prev, curr) => {
    const likes = prev[curr.author] ? prev[curr.author] + curr.likes : curr.likes
    return {
      ...prev,
      [curr.author]: likes
    }
  }, {})

  return Object.entries(sortedLikes).reduce((prev, [key, value]) => {

    return value > prev.likes ? { author: key, likes: value } : prev

  }, { likes: 0 })
}

module.exports = {
  dummy,
  totalLikes,
  mostBlogs,
  mostLikes,
  favoriteBlog
}