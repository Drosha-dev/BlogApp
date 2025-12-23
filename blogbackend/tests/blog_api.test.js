const assert = require('node:assert')
const { test, after, describe, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlog)
})



describe('base tests', () => {

  test('returned as JSON', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('All blogs returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlog.length)
  })

  test('blogs have id and not _id property', async () => {
    const response = await api.get('/api/blogs')

    const blog = response.body[0]
    // This checks that the id property exists and is truthy.
    assert(blog.id)
    //This checks that _id does not exist.
    assert.strictEqual(blog._id, undefined)
  })
})

describe('Post tests', () => {

  test('Post request to blogs', async () => {
    const newBlog = {
      title: 'This is a test title',
      content: 'This is test content lorem Ipsum dabelamd adwadwd a  ',
      url: 'www.dadadadwdwd.wadarwwad',
      like: 155,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlog.length + 1)

    const contents = blogsAtEnd.map(b => b.title)
    assert(contents.includes('This is a test title'))

  })

  test('Post without likes', async () => {
    const newBlog = {
      title: 'This is a test title',
      content: 'This is test content lorem Ipsum dabelamd adwadwd a  ',
      url: 'www.dadadadwdwd.wadarwwad',
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)


    assert.strictEqual(response.body.like, 0)
  })

  test('Post without title responds with 400', async () => {
    const newBlog = {
      content: 'This is test content lorem Ipsum dabelamd adwadwd a  ',
      url: 'www.dadadadwdwd.wadarwwad',
      like: 15
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})