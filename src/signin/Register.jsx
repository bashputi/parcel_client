
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


// const defaultTheme = createTheme();

export default function Register() {
    const axiosPublic = useAxiosPublic();
    const { signUp, handleUpdateProfile } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: {errors}} = useForm();
  const onSubmit = (data) => {

    signUp(data.email, data.password)
     .then(res => {
        const loggedUser = res.user;
        console.log(loggedUser);
        handleUpdateProfile(data.name, data.photoURL)
        .then(() => {
            const userInfo = {
                name: data.name,
                email: data.email
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
                  navigate('/login'); 
                }
              })
        })
        .catch(error => console.log(error));
     })
  };
  

  return (
   
      <Container component="main" maxWidth="xs">
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
      
      </Container>
 
  );
}