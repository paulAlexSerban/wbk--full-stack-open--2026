import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  test('renders URL and likes when the view button has been clicked', async () => {
    const blog = {
      title: 'Clicks can be tested in react with compoenent testing',
      author: 'lePaul Tests All',
      url: 'https://paulserban.eu/testing',
      likes: 1,
      user: {
        username: 'lePaulQa',
        name: 'Paul Serban QA'
      }
    }

    const { container } = render(<Blog blog={blog} />)

    const user = userEvent.setup()

    const button = screen.getByText('view')
    await user.click(button)


    const detailsDiv = container.querySelector('.blog__details')
    expect(detailsDiv).not.toBeNull()

    expect(detailsDiv).toHaveTextContent('https://paulserban.eu/testing')
    expect(detailsDiv).toHaveTextContent('likes 1')
    expect(detailsDiv).toHaveTextContent('Paul Serban QA')
  })

  test('ensures that if the like button is clicked twice, the event handler is called twice', async () => {
    const blog = {
      title: 'Handle event callbacks for testing',
      author: 'John Doe Test Guru',
      url: 'https://paulserban.eu/blog/callbacks',
      likes: 7,
      user: {
        username: 'le_paul_spies_on_callbacks',
        name: 'Le Mock Tester'
      }
    }

    const mockLikeHandler = vi.fn()

    render(<Blog blog={blog} handleLike={mockLikeHandler} />)

    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLikeHandler).toHaveBeenCalledTimes(2)
  })
})