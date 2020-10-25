import React from 'react'
import MuiAlert, { Color } from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

type params = {
  message: string
  severity: Color
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Alert: React.FC<params> = ({ message, severity, open, setOpen }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={() => setOpen(false)}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <MuiAlert severity={severity} variant="filled">
        {message}
      </MuiAlert>
    </Snackbar>
  )
}

export default Alert
