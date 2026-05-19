const mongoose = require('mongoose')
const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../src/app')
const api = supertest(app)
const Blog = require('../src/models/blog')
const User = require('../src/models/user')

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
  await User.deleteMany({})

  const testUser = new User({
    username: 'testadmin',
    name: 'Test Administrator',
    passwordHash: 'dummyhash'
  })
  const savedUser = await testUser.save()

  for (let blogData of initBlogs) {
    let blogObj = new Blog({
      ...blogData,
      user: savedUser.id
    })
    const savedBlog = await blogObj.save()

    savedUser.blogs = savedUser.blogs.concat(savedBlog.id)
  }
  await savedUser.save()
})

describe('blog api - fetching existing blogs (GET /api/blogs)', () => {
  test('should return all stored blogs as a json array with the correct total count', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, initBlogs.length)
  })

  test('should map the internal database "_id" field to a cleaner, client-facing "id" attribute and strip metadata', async () => {
    const response = await api.get('/api/blogs').expect(200)
    const firstBlog = response.body[0]

    assert.notStrictEqual(firstBlog.id, undefined)
    assert.strictEqual(firstBlog._id, undefined)
    assert.strictEqual(firstBlog.__v, undefined)
  })
})

describe('blog api - creating a new blog (POST /api/blogs)', () => {
  test('should successfully save a valid blog post to the database and increment the total collection size', async () => {
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
    assert.strictEqual(response.body.length, initBlogs.length + 1)

    const titles = response.body.map(b => b.title)
    assert.ok(
      titles.includes('Edge-First Asset Deployment: Beyond the Traditional CDN in 2026'),
      'the persistence layer should contain the newly created blog post title'
    )
  })

  test('should automatically default the "likes" attribute to 0 if it is omitted from the request payload', async () => {
    const newBlogWithoutLikes = {
      title: 'TDD Harms Architecture',
      author: 'Robert C. Martin AKA Uncle Bob',
      url: 'https://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)
  })

  test('should reject the creation request with status code 400 Bad Request if the "title" property is missing', async () => {
    const newBlogWithoutTitle = {
      author: 'Anonymous Author',
      url: 'https://example.com/missing-title',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlogWithoutTitle)
      .expect(400)
  })

  test('should reject the creation request with status code 400 Bad Request if the "url" property is missing', async () => {
    const newBlogWithoutUrl = {
      title: 'A blog post with missing web address',
      author: 'Anonymous Author',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlogWithoutUrl)
      .expect(400)
  })
})

describe('blog api - removing an individual blog (DELETE /api/blogs/:id)', () => {
  test('should remove the targeted blog from the system and return status code 204 No Content when given a valid ID', async () => {
    const responseAtStart = await api.get('/api/blogs')
    const blogToDelete = responseAtStart.body[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const responseAtEnd = await api.get('/api/blogs')
    assert.strictEqual(responseAtEnd.body.length, responseAtStart.body.length - 1)

    const titles = responseAtEnd.body.map(r => r.title)
    assert.ok(
      !titles.includes(blogToDelete.title),
      'the database collection should no longer contain the removed blog post'
    )
  })
})

describe('blog api - modifying an individual blog (PUT /api/blogs/:id)', () => {
  test('should correctly update the "likes" metrics of a specific blog and persist mutations securely', async () => {
    const responseAtStart = await api.get('/api/blogs')
    const blogToUpdate = responseAtStart.body[0]

    const updatedBlogData = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 10
    }

    const resultResponse = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlogData)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(resultResponse.body.likes, blogToUpdate.likes + 10)
    const responseAtEnd = await api.get('/api/blogs')
    const updatedBlogInDb = responseAtEnd.body.find(b => b.id === blogToUpdate.id)

    assert.strictEqual(updatedBlogInDb.likes, blogToUpdate.likes + 10)
  })
})

after(async () => {
  await mongoose.connection.close()
})
