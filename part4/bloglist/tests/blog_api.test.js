const mongoose = require('mongoose')
const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../src/app') // Your Express app export
const api = supertest(app)
const Blog = require('../src/models/blog')
const initBlogs = [
  {
    title:
      'Applying SOLID to prompt engineering: why your prompts violate the single responsibility principle',
    author: 'Paul Serban',
    url: 'https://paulserban.eu/blog/post/applying-solid-to-prompt-engineering-why-your-prompts-violate-the-single-responsibility-principle/',
    likes: 5,
  },
  {
    title: '3 Meta-Prompting Patterns for Enterprise-Grade Structured Outputs',
    author: 'Paul Serban',
    url: 'https://paulserban.eu/blog/post/3-meta-prompting-patterns-for-enterprise-grade-structured-outputs/',
    likes: 6,
  },
  {
    title:
      'Few-Shot Prompt Libraries: How to Build Reusable Examples that Don`t Rot',
    author: 'Paul Serban',
    url: 'https://paulserban.eu/blog/post/few-shot-prompt-libraries-how-to-build-reusable-examples-that-dont-rot/',
    likes: 15,
  },
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blogData of initBlogs) {
    let blogObj = new Blog(blogData)
    await blogObj.save()
  }
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    console.log({ body: response.body })
  })

  test('blogs are returned as json and correct amount is fetched', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, initBlogs.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
