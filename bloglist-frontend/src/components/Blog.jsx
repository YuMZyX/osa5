import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const [removeVisible, setRemoveVisible] = useState(false)

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setBlogVisible(!blogVisible)
  }

  const update = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1}
    updateBlog(blog.id, updatedBlog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
  const user = JSON.parse(loggedUserJSON)
  if (blog.user.username === user.username) {
    //setRemoveVisible(true)
  }
  
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} <button onClick={toggleVisibility}>Hide</button><br />
        {blog.url}<br />
        Likes:&nbsp; {blog.likes} &nbsp;<button onClick={update}>Like</button><br />
        {blog.author}
      </div>
    </div>
  )
}

export default Blog