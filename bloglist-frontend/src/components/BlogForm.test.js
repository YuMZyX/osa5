import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()
  const notification = jest.fn()

  render(<BlogForm createBlog={createBlog} notification={notification} />)

  const title = screen.getByPlaceholderText('input title')
  const author = screen.getByPlaceholderText('input author')
  const url = screen.getByPlaceholderText('input url')
  const createButton = screen.getByText('Create')

  await user.type(title, '5.16 BlogForm test')
  await user.type(author, 'Joni Koskinen')
  await user.type(url, 'http://blogformtest.fi')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('5.16 BlogForm test')
  expect(createBlog.mock.calls[0][0].author).toBe('Joni Koskinen')
  expect(createBlog.mock.calls[0][0].url).toBe('http://blogformtest.fi')
})