// route handler controller
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if(!body.title || !body.url) {
    return response.status(400).json({
      error: 'title or url is missing'
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    like: body.like ?? 0
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id' , async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blogToUpdate = {
    title: body.title,
    author: body.author,
    url: body.url,
    like: body.like ? body.like : 0
  }

  await Blog.findByIdAndUpdate(request.params.id, blogToUpdate, { new: true })
  response.json(blogToUpdate)
})


module.exports = blogsRouter