import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls the event handler with the right details when a new blog is created', async () => {
    const createBlogMock = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlogMock} />)

    const [titleInput, authorInput, urlInput] = screen.getAllByRole('textbox')

    const submitButton = screen.getByRole('button', { name: /create/i })

    await user.type(titleInput, 'Component integration testing in React')
    await user.type(authorInput, 'Pal Serban Integrates')
    await user.type(urlInput, 'https://paulserban.eu/blog/component-integrations-in-react')

    await user.click(submitButton)

    expect(createBlogMock).toHaveBeenCalledTimes(1)
    expect(createBlogMock.mock.calls[0][0]).toEqual({
      title: 'Component integration testing in React',
      author: 'Pal Serban Integrates',
      url: 'https://paulserban.eu/blog/component-integrations-in-react'
    })
  })
})