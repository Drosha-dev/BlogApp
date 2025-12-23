const Blog = require('../models/blog')

const initialBlog = [
  {
    title: 'Breaking Into Tech Without Loving Code',
    content: 'Not everyone in tech wakes up excited to write code, and that’s okay. Many roles value problem-solving, communication, and system thinking over raw programming passion. This post explores alternative tech paths and how to leverage junior dev experience without burning out.',
    url: 'https://example.com/blog/breaking-into-tech-without-loving-code',
    like: 142
  },
  {
    title: 'What I Learned From Failing My First Internship Search',
    content: 'Rejection emails hurt, especially when your degree depends on landing an internship. Here’s what went wrong in my first search, what I changed, and how reframing the process helped me finally get traction.',
    url: 'https://example.com/blog/failing-first-internship-search',
    like: 87
  },
  {
    title: 'Low-Stress Tech Jobs That Still Pay the Bills',
    content: 'High-pressure engineering roles aren’t for everyone. This article breaks down lower-stress tech-adjacent jobs, the skills they require, and how developers can pivot without starting from zero.',
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