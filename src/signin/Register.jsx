import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import {  ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Google from './Google';
import { MenuItem } from '@mui/material';
import { useState } from 'react';
import { Helmet } from 'react-helmet';


// const defaultTheme = createTheme();

export default function Register() {
  const [role, setRole] = useState('');
    const axiosPublic = useAxiosPublic();
    const { signUp, handleUpdateProfile } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: {errors}} = useForm();

    const handleRoleChange = (event) => {
      setRole(event.target.value);
      console.log(event.target.value)
  };

  const onSubmit = (data) => {
    const formData = { ...data, role };
console.log(formData)
    signUp(formData.email, formData.password)
     .then(res => {
        const loggedUser = res.user;
        console.log(loggedUser);
        handleUpdateProfile(data.name, data.photoURL)
        .then(() => {
            const userInfo = {
                name: formData.name,
                email: formData.email,
                role: formData.role,
                phn: formData.phn
              }
              axiosPublic.post('/users', userInfo)
              .then(res => {
                if(res.data.insertedId){
                  reset();
                  Swal.fire({
                      position: "top-left",
                      icon: "success",
                      title: "Registration successful!!",
                      showConfirmButton: false,
                      timer: 1500
                  });
                  navigate('/'); 
                }
              })
        })
        .catch(error => console.log(error));
     })
  };
  

  return (<>

<Helmet>
                <meta charSet="utf-8" />
                <title>PAKEED | Register </title>
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
             
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="family-name"
                  {...register("name", { required: "Name is required"})}
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="phn"
                  label="Phone No"
                  name="phn"
                  autoComplete="phone-no"
                  {...register("phn", { required: "Phone no is required"})}
                  error={Boolean(errors.phn)}
                  helperText={errors.phn?.message}
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
                  {...register("email", { required: "Email is required"})}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
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
                  {...register("password", { required: true, minLength: 6})}
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                />
                  {errors.password?.type === 'required' && <Typography sx={{ color: '#e53e3e' }}>Password atlest 6 charecter</Typography>}
               

              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="imageUrl"
                  label="Image URL"
                  type="url"
                  id="image"
                  autoComplete="url"
                  {...register("imageUrl", { required: "Image UR is required"})}
                  error={Boolean(errors.imageUrl)}
                  helperText={errors.imageUrl?.message}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  name="role"
                  label="Sign in As"
                  type="text"
                  id="role"
                  autoComplete="role"
                  value={role}
                  onChange={handleRoleChange}
                  select>
                <MenuItem value="commoner">User</MenuItem>
                <MenuItem value="deliveryman">Delivery man</MenuItem>
                </TextField>
               </Grid>
        
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      <Google></Google>
      </Paper>
      </Container>
      </>
 
  );
}