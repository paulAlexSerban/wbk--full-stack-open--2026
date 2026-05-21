import { useState } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        mt: 2,
        mb: 2
      }}
    >
      <Typography component="h2" variant="h5">
        Create new blog
      </Typography>

      <TextField
        required
        fullWidth
        label="Title"
        name="title"
        variant="outlined"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />

      <TextField
        required
        fullWidth
        label="Author"
        name="author"
        variant="outlined"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />

      <TextField
        required
        fullWidth
        label="URL"
        name="url"
        variant="outlined"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ alignSelf: 'flex-start', px: 4 }}
      >
        Create
      </Button>
    </Box>
  )
}

export default BlogForm