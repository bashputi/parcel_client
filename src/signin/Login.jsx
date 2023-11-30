import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useAuth from '../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Google from './Google';
import { Paper } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Helmet } from 'react-helmet';
import { useState } from 'react';


export default function Login() {
  const [logInError, setLogInError] = useState('');
  const [success, setSuccess] = useState('');
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    setLogInError('');
    setSuccess('');
    signIn(email, password)
     .then(result => {
         const user = result.user;
         console.log(user)
         Swal.fire({
           position: "top-center",
           icon: "success",
           title: "Login successful!!",
           showConfirmButton: false,
           timer: 1500
         });
         navigate(from, { replace: true });
     })
     .catch(error => {
     setLogInError(error.message);
  })
       
  };
  

  return (
    <div data-aos="zoom-in" data-aos-duration="3000" >
    <Helmet>
                <meta charSet="utf-8" />
                <title>PAKEED | Login </title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
      <Container component="main" maxWidth="xs">
        <Paper sx={{ px: '30px' }} elevation={16} >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  type='email'
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
              <div className='mt-5 ml-6'>
              {
        logInError && <p className="text-red-700">{logInError}</p>
      }
      {
        success && <p className="text-green-600">{success}</p>
      }
              </div>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  Don't have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      <Google />
      </Paper>
      </Container>
    
 </div>
  );
}