const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../src/utils/list_helper')

const blogs = [
  {
    _id: '5a422a851b54a6734234d17f7',
    'title':'Chain-of-Validation: Engineering Reliable AI Systems Through Iterative Self-Verification',
    'author':'Paul Serban',
    'url':'https://paulserban.eu/blog/post/chain-of-validation-engineering-reliable-ai-systems-through-iterative-self-verification/',
    'likes': 1,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234er7f8',
    'title':'Applying SOLID to prompt engineering: why your prompts violate the single responsibility principle',
    'author':'Paul Serban',
    'url':'https://paulserban.eu/blog/post/applying-solid-to-prompt-engineering-why-your-prompts-violate-the-single-responsibility-principle/',
    'likes': 5,
    __v: 0
  },
  {
    _id: '5a411b3a1b54a676234d17f9',
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
  },
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2014/12/17/TheTDDHypeSyndrome.html',
    likes: 0,
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
    assert.strictEqual(result, 51)
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

describe('most blogs', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostBlogs([])
    assert.strictEqual(result, null)
  })

  test('when list has only one blog, returns that author with a count of 1', () => {
    const listWithOneBlog = [blogs[0]]
    const result = listHelper.mostBlogs(listWithOneBlog)

    assert.deepStrictEqual(result, {
      author: 'Paul Serban',
      blogs: 1
    })
  })

  test('of a bigger list finds the author with the most blogs', () => {
    const result = listHelper.mostBlogs(blogs)

    assert.deepStrictEqual(result, {
      author: 'Paul Serban',
      blogs: 4
    })
  })
})

describe('most likes', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostLikes([])
    assert.strictEqual(result, null)
  })

  test('when list has only one blog, returns that author and their likes', () => {
    const listWithOneBlog = [blogs[0]]
    const result = listHelper.mostLikes(listWithOneBlog)

    assert.deepStrictEqual(result, {
      author: 'Paul Serban',
      likes: 1
    })
  })

  test('of a bigger list finds the author with the overall most likes', () => {
    const result = listHelper.mostLikes(blogs)

    assert.deepStrictEqual(result, {
      author: 'Paul Serban',
      likes: 27
    })
  })
})