import { useState } from 'react'

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
          <input value={title} name="Title" onChange={event => setTitle(event.target.value)} />
        </div>
        <div>
          Author:
          <input value={author} name="Author" onChange={event => setAuthor(event.target.value)} />
        </div>
        <div>
          Url:
          <input value={url} name="Url" onChange={event => setUrl(event.target.value)} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm