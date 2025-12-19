// const dummy = (blogs) => {
//   const num = 1

//   return num
// }

const totalLikes = (blogs) => {
  // first checks if the length of the array if its NaN returns 0 otherwise runs the reducer / /calculates sum of each like element in the array and adds it to sum
  return blogs.length === 0 ? 0 : blogs.reduce((sum,blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((maxBlog, blog) => {
    // left of ?  is the condional checking which blog has the most likes then if blog.likes has more it is now maxBlog saving which has the most
    return blog.likes > maxBlog.likes ? blog : maxBlog
  })
}

module.exports = {
  totalLikes, favoriteBlog
}

