const Blog = require('../models/blog')

const initialBlog = [
  {
    title: 'Breaking Into Tech Without Loving Code',
    author: 'James Holden',
    url: 'https://example.com/blog/breaking-into-tech-without-loving-code',
    like: 142
  },
  {
    title: 'What I Learned From Failing My First Internship Search',
    author: 'Alex Kamal',
    url: 'https://example.com/blog/failing-first-internship-search',
    like: 87
  },
  {
    title: 'Low-Stress Tech Jobs That Still Pay the Bills',
    author: 'Amos Burton',
    url: 'https://example.com/blog/low-stress-tech-jobs',
    like: 203
  }
]


const blogsInDb = async () => {
  const blogs = await Blog.find({})

  return blogs.map(blog => blog.toJSON())
}


module.exports = {
  initialBlog, blogsInDb
}