require('dotenv').config()
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

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl, { family:4})

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

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
})