const mongoose = require('mongoose')
const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../src/app')
const api = supertest(app)
const User = require('../src/models/user')
const bcrypt = require('bcrypt')

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('secretpass', 10)
  const user = new User({
    username: 'root',
    name: 'Administrator',
    passwordHash
  })

  await user.save()
})

describe('user management api (POST /api/users)', () => {
  test('should fail with status code 400 and a descriptive error when username is shorter than 3 characters', async () => {
    const newUser = {
      username: 'pa',
      name: 'Paul Serban',
      password: 'validpassword'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.ok(result.body.error.includes('username'))

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, 1)
  })

  test('should fail with status code 400 and a descriptive error when password is shorter than 3 characters', async () => {
    const newUser = {
      username: 'paul_s',
      name: 'Paul Serban',
      password: '12'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.ok(result.body.error.includes('password'))

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, 1)
  })

  test('should fail with status code 400 and clear error message when attempting to register a duplicate username', async () => {
    const duplicateUser = {
      username: 'root',
      name: 'Imposter Admin',
      password: 'anothersecurepassword'
    }

    const result = await api
      .post('/api/users')
      .send(duplicateUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.ok(result.body.error.includes('unique'))

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})