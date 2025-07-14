import { Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { Container, Paper } from '@mui/material';

const Signupp = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
       Sign Up
     </Typography>
     <Typography variant="body1" color="text.secondary" gutterBottom>
      Sign up to continue
     </Typography>
      <br /><br />
        <TextField variant="outlined" label="Name"/>
      <br /><br />
      <TextField variant="outlined" label="Email"/>
      <br /><br />
       <TextField variant="outlined" label="Password"/>
      <br /><br />
      <Button variant='contained'>Sign up</Button>
      <br /><br />
      </div>
  

  )
}

export default Signupp

