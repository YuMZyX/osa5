import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setBlogVisible(!blogVisible)
  }

  const update = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1}
    updateBlog(blog.id, updatedBlog)
  }

  const remove = () => {
    deleteBlog(blog.id)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showRemoveButton = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    const user = JSON.parse(loggedUserJSON)
    if (!user) {return}
    if (blog.user.username === user.username) {
      return (
        <div>
          <button onClick={remove}>Remove</button>
        </div>
      )
    }
  }
  
  return (
    <div style={blogStyle} className='blog'>
      <div style={hideWhenVisible} className='title'>
        <span>{blog.title}</span><button onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible} className='detailedInfo'>
        {blog.title} <button onClick={toggleVisibility}>Hide</button><br />
        {blog.url}<br />
        Likes:&nbsp; {blog.likes} &nbsp;<button onClick={update}>Like</button><br />
        {blog.author}
        {showRemoveButton()}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog