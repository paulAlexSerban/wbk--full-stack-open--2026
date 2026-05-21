import { Alert, Box } from '@mui/material'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  const severity = type === 'error' ? 'error' : 'success'

  return (
    <Box sx={{ width: '100%', mt: 2, mb: 2 }}>
      <Alert severity={severity} variant="filled" className={type}>
        {message}
      </Alert>
    </Box>
  )
}

export default Notification
