const mongoose = require('mongoose')
const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../src/app')
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
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs are returned as json and correct amount is fetched', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, initBlogs.length)
  })

  test('blogs have a unique identifier named id instead of _id', async () => {
    const response = await api.get('/api/blogs').expect(200)
    const firstBlog = response.body[0]

    assert.notStrictEqual(firstBlog.id, undefined)
    assert.strictEqual(firstBlog._id, undefined)
    assert.strictEqual(firstBlog.__v, undefined)
  })
})

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Edge-First Asset Deployment: Beyond the Traditional CDN in 2026',
      author: 'Paul Serban',
      url: 'https://paulserban.eu/blog/post/edge-first-asset-deployment-beyond-the-traditional-cdn-in-2026',
      likes: 12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initBlogs.length + 1 )

    const titles = response.body.map(b => b.title)
    assert.ok(titles.includes('Edge-First Asset Deployment: Beyond the Traditional CDN in 2026'), 'The new blog title should be present in the database')
  })

  test('if the likes property is missing, it defaults to 0', async () => {
    const newBlogWithoutLikes = {
      title: 'TDD Harms Architecture',
      author: 'Robert C. Martin AKA Uncle Bob',
      url: 'https://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
      // 'likes' property is intentionally missing
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)
  })

  test('backend responds with 400 Bad Request if title is missing', async () => {
    const newBlogWithoutTitle = {
      author: 'Annonymous Author',
      url: 'https://example.com/missing-title',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlogWithoutTitle)
      .expect(400)
  })

  test('backend responds with 400 Bad Request if url is missing', async () => {
    const newBlogWithoutUrl = {
      title: 'A blog post with missing web address',
      author: 'Annonymous Author',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlogWithoutUrl)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const responseAtStart = await api.get('/api/blogs')
    const blogToDelete = responseAtStart.body[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const responseAtEnd = await api.get('/api/blogs')
    assert.strictEqual(responseAtEnd.body.length, responseAtStart.body.length - 1)

    const titles = responseAtEnd.body.map(r => r.title)
    assert.ok(!titles.includes(blogToDelete.title), 'The deleted blog title should not be in the database')
  })
})

after(async () => {
  await mongoose.connection.close()
})
