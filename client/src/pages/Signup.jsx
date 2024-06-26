import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {useMutation} from '@apollo/client';
import {ADD_USER} from '../utils/mutations';

import Auth from '../utils/auth';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: [
      'Pixelify Sans',
      'normal'
    ].join(',')
  }
});

export default function SignUp() {

  const [addUser, {error, data}] = useMutation(ADD_USER);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputData = new FormData(event.currentTarget);
    const username = inputData.get('username');
    if(!username){
      alert("Username is required");
      return;
    }

    const email = inputData.get('email');
    if(!email){
      alert("Email is required");
      return;
    }

    const password = inputData.get("password");
    if(!password){
      alert("Password is required");
      return;
    }

    try{
      const {data} = await addUser({
        variables: {
          username: username,
          email: email,
          password: password
        }
      })

      Auth.login(data.addUser.token);
    }
    catch(e){
      console.error(e);
    }
  };

  return (
  
      <Container component="main" maxWidth="xs">

        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" style={{ fontSize: "30px" }}>
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>

            </Grid>
            <Button style={{ fontSize: "15px" }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {error ? <div style={{textAlign:"left", fontSize:"25px"}}>{error.message}</div>:null}
            <Grid container justifyContent="flex-end">
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}