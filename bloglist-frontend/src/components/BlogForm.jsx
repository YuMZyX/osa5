import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog, notification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
    notification(`A new blog: ${title} was added`)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h3>Create a new blog</h3>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input value={title} id='titleInput' name="Title" onChange={event => setTitle(event.target.value)} placeholder='input title' />
        </div>
        <div>
          Author:
          <input value={author} id='authorInput' name="Author" onChange={event => setAuthor(event.target.value)} placeholder='input author' />
        </div>
        <div>
          Url:
          <input value={url} id='urlInput' name="Url" onChange={event => setUrl(event.target.value)} placeholder='input url' />
        </div>
        <button id='createBlog' type="submit">Create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  notification: PropTypes.func.isRequired
}

export default BlogForm