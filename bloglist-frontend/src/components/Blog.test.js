import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  const updateBlogMock = jest.fn()
  const deleteBlogMock = jest.fn()

  beforeEach(() => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Joni Koskinen',
        url: 'www.testi.fi',
        likes: 3251,
        user: 'testi'
    }
    
    container = render(<Blog blog={blog} updateBlog={updateBlogMock} deleteBlog={deleteBlogMock} />).container
  })

  test('renders title, but not author, url and likes by default', () => {
    const title = container.querySelector('.title')
    expect(title).toHaveTextContent('Component testing is done with react-testing-library')

    const detailedInfo = container.querySelector('.detailedInfo')
    expect(detailedInfo).toHaveStyle('display: none')
  })

  test('after clicking show button, all the info is displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    const detailedInfo = container.querySelector('.detailedInfo')
    expect(detailedInfo).not.toHaveStyle('display: none')
    expect(detailedInfo).toHaveTextContent('Joni Koskinen')
    expect(detailedInfo).toHaveTextContent('www.testi.fi')
    expect(detailedInfo).toHaveTextContent('3251')
  })

  test('clicking like button twice calls event handler twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('View')
    await user.click(viewButton)

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(updateBlogMock.mock.calls).toHaveLength(2)
  })


})