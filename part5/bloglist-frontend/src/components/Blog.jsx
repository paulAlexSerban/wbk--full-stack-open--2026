import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Link,
  CircularProgress,
} from '@mui/material'

const Blog = ({ blog, handleLike, handleDelete, currentUser }) => {
  if (!blog) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress size={30} />
        <Typography sx={{ ml: 2 }}>Loading blog post data...</Typography>
      </Box>
    )
  }

  const showDeleteButton =
    currentUser && blog.user && currentUser.username === blog.user.username

  return (
    <Card
      variant="outlined"
      className="blog__view"
      sx={{ maxWidth: 600, mt: 3, boxShadow: 1, borderRadius: 2 }}
    >
      <CardContent>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 600, color: 'text.primary' }}
        >
          {blog.title}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
          by <strong>{blog.author}</strong>
        </Typography>

        <Box
          className="blog__details"
          sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 2 }}
        >
          <div>
            <Link
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="body1"
              sx={{
                wordBreak: 'break-all',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              {blog.url}
            </Link>
          </div>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            <Chip
              label={`likes: ${blog.likes}`}
              color="primary"
              variant="outlined"
              size="medium"
              sx={{ fontWeight: 'bold' }}
            />
            {currentUser && (
              <Button
                onClick={handleLike}
                variant="contained"
                color="primary"
                size="small"
              >
                like
              </Button>
            )}
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, fontStyle: 'italic' }}
          >
            added by {blog.user?.name || blog.user?.username || 'unknown user'}
          </Typography>
        </Box>
      </CardContent>

      {showDeleteButton && (
        <CardActions
          sx={{
            justifyContent: 'flex-end',
            p: 2,
            borderTop: '1px solid #f0f0f0',
            backgroundColor: '#fbfbfb',
          }}
        >
          <Button
            onClick={handleDelete}
            variant="outlined"
            color="error"
            size="small"
          >
            remove
          </Button>
        </CardActions>
      )}
    </Card>
  )
}

export default Blog
