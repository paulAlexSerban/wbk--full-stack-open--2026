const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../src/utils/list_helper')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    'title':'Chain-of-Validation: Engineering Reliable AI Systems Through Iterative Self-Verification',
    'author':'Paul Serban',
    'url':'https://paulserban.eu/blog/post/chain-of-validation-engineering-reliable-ai-systems-through-iterative-self-verification/',
    'likes': 1,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    'title':'Applying SOLID to prompt engineering: why your prompts violate the single responsibility principle',
    'author':'Paul Serban',
    'url':'https://paulserban.eu/blog/post/applying-solid-to-prompt-engineering-why-your-prompts-violate-the-single-responsibility-principle/',
    'likes': 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    'title':'3 Meta-Prompting Patterns for Enterprise-Grade Structured Outputs',
    'author':'Paul Serban',
    'url':'https://paulserban.eu/blog/post/3-meta-prompting-patterns-for-enterprise-grade-structured-outputs/',
    'likes': 6,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    'title':'Few-Shot Prompt Libraries: How to Build Reusable Examples that Don`t Rot',
    'author':'Paul Serban',
    'url':'https://paulserban.eu/blog/post/few-shot-prompt-libraries-how-to-build-reusable-examples-that-dont-rot/',
    'likes': 15,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogsEmpty = []
  const result = listHelper.dummy(blogsEmpty)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const listWithOneBlog = [blogs[1]]
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 27)
  })


})

describe('favorite blog', () => {
  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog([])
    assert.strictEqual(result, null)
  })

  test('when list has only one blog, returns that blog', () => {
    const listWithOneBlog = [blogs[0]]
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, blogs[0])
  })

  test('of a bigger list finds the blog with the most likes', () => {
    const result = listHelper.favoriteBlog(blogs)


    const expectedBlog =   {
      _id: '5a422b3a1b54a676234d17f9',
      'title':'Few-Shot Prompt Libraries: How to Build Reusable Examples that Don`t Rot',
      'author':'Paul Serban',
      'url':'https://paulserban.eu/blog/post/few-shot-prompt-libraries-how-to-build-reusable-examples-that-dont-rot/',
      'likes': 15,
      __v: 0
    }

    assert.deepStrictEqual(result, expectedBlog)
  })
})