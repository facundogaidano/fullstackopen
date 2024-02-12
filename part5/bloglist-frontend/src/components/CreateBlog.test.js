import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import CreateBlog from './CreateBlog'
import userEvent from '@testing-library/user-event'

describe('<CreateBlog />', () => {
  test('form calls the event handler with right details', async () => {
    const addBlog = jest.fn()

    const { container } = render(<CreateBlog addBlog={addBlog} user={{ id: 'someUserId' }} />)

    const titleInputEl = container.querySelector('input[name="title"]')
    const authorInputEl = container.querySelector('input[name="author"]')
    const urlInputEl = container.querySelector('input[name="url"]')
    const saveButton = screen.getByText('Create')

    const newBlog = {
      title: 'New blog',
      author: 'New author',
      url: 'New url'
    }

    await userEvent.type(titleInputEl, newBlog.title)
    await userEvent.type(authorInputEl, newBlog.author)
    await userEvent.type(urlInputEl, newBlog.url)

    await userEvent.click(saveButton)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe(newBlog.title)
    expect(addBlog.mock.calls[0][0].author).toBe(newBlog.author)
    expect(addBlog.mock.calls[0][0].url).toBe(newBlog.url)
  })
})
