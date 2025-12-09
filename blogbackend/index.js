const config = require('./utils/config')
const express = require ('express')
const mongoose = require('mongoose')

const app = express()

const blogSchema = mongoose.Schema({
    title: String,
    content: String,
    url: String,
    like: Number
})

const Blog = mongoose.model('Blog', blogSchema)


mongoose.connect(config.MONGODB_URI , { family:4})

app.use(express.json())

app.get('/api/blogs', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
    })
})

app.post('/api/blogs', (request,response) => {
    const blog = new Blog(request.body)

    blog.save().then(savedBlog => {
        response.status(201).json(savedBlog)
    })
})


app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
})