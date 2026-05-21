import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import Blog from './Blog'

describe('<Blog />', () => {
  test('renders title and author, but does not render URL or likes by default', () => {
    const blog = {
      title: 'React component testing is done with react-testing-library',
      author: 'lePaul Dev Team',
      url: 'https://paulserban.eu/blog/blog_page',
      likes: 12,
      user: {
        username: 'lePaul',
        name: 'Paul Serban'
      }
    }

    const { container } = render(<Blog blog={blog} />)

    const summaryDiv = container.querySelector('.blog__summary')
    expect(summaryDiv).toHaveTextContent('React component testing is done with react-testing-library')
    expect(summaryDiv).toHaveTextContent('lePaul Dev Team')

    const detailsDiv = container.querySelector('.blog__details')
    expect(detailsDiv).toBeNull()

    expect(screen.queryByText('https://paulserban.eu/blog/blog_page')).toBeNull()
    expect(screen.queryByText(/likes/)).toBeNull()
  })
})