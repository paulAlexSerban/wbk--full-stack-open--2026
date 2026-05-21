import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import Blog from './Blog'

const TEST_DATA_BLOG = {
  id: '123asd456qwe799zxc',
  title: 'React component testing with routing architecture',
  author: 'lePaul Dev Team',
  url: 'https://paulserban.eu/blog/blog_page',
  likes: 12,
  user: {
    username: 'lePaul',
    name: 'Paul Serban',
  },
}

describe('<Blog />', () => {
  test('displays blog information and likes to unauthenticated users, but hides buttons', () => {
    const { container } = render(<Blog blog={TEST_DATA_BLOG} currentUser={null} />)

    expect(screen.getByText(TEST_DATA_BLOG.title)).toBeInTheDocument()
    expect(screen.getByText(TEST_DATA_BLOG.url)).toBeInTheDocument()
    expect(screen.getByText(/likes 12/)).toBeInTheDocument()
    expect(screen.getByText(/added by Paul Serban/)).toBeInTheDocument()

    const buttons = container.querySelectorAll('button')
    expect(buttons.length).toBe(0)
  })

  test('displays only the like button to authenticated users who are not the creator', () => {
    const regularUser = {
      username: 'guest_reviewer',
      name: 'Guest Reviewer',
    }

    render(<Blog blog={TEST_DATA_BLOG} currentUser={regularUser} />)
    expect(screen.getByText(/likes 12/)).toBeInTheDocument()

    const likeButton = screen.getByRole('button', { name: /like/i })
    expect(likeButton).toBeInTheDocument()

    const removeButton = screen.queryByRole('button', { name: /remove/i })
    expect(removeButton).toBeNull()
  })

  test('displays the delete/remove button to the authenticated creator of the blog', () => {
    const creatorUser = {
      username: 'lePaul',
      name: 'Paul Serban',
    }

    render(<Blog blog={TEST_DATA_BLOG} currentUser={creatorUser} />)

    expect(screen.getByRole('button', { name: /like/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument()
  })

  test('ensures that if the like button is clicked twice, the event handler is called twice', async () => {
    const loggedUser = {
      username: 'someUser',
      name: 'Some User',
    }
    const mockLikeHandler = vi.fn()
    const user = userEvent.setup()

    render(
      <Blog blog={TEST_DATA_BLOG} currentUser={loggedUser} handleLike={mockLikeHandler}/>,
    )

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLikeHandler).toHaveBeenCalledTimes(2)
  })
})
