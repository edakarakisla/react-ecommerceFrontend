import { Button, InputAdornment, TextField, Paper, Typography, IconButton } from '@mui/material';
import React, { useState } from 'react';
import SendIcon from "@mui/icons-material/Send";
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';

// Validation schema for registration
const registerSchema = Yup.object().shape({
  username: Yup.string().required("Username is required!")
    .min(3, "Username is too short!").max(15, "Username is too long!"),
  email: Yup.string().required("Email is required!")
    .email("Invalid Email"),
  password: Yup.string().required("Password is required!")
    .min(4, "Password is too short!"),
  passwordConfirmation: Yup.string().required("Password Confirm is required!")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirmation, setIsVisibleConfirmation] = useState(false);
  const navigate = useNavigate();

  // Function to handle user registration
  const handleRegister = async (values) => {
    const { email, username, password } = values;
    const requestObj = { email, username, password };
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:9000/user/register", requestObj);
      if (res.data.status) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      console.log("Register Error", err);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '16px' 
      }}
    >
      <Formik
        initialValues={{ username: "", email: "", password: "", passwordConfirmation: "" }}
        onSubmit={(values) => handleRegister(values)}
        validationSchema={registerSchema}
      >
        {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
          <Paper elevation={15} className="p-6 md:p-8 rounded-lg bg-orange-500 text-white max-w-md w-full">
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              Register
            </Typography>
            <TextField
              variant='outlined'
              label="Username"
              sx={{ mb: 2 }}
              name='username'
              onChange={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
              helperText={touched.username && errors.username}
              error={touched.username && Boolean(errors.username)}
              fullWidth
            />
            <TextField
              variant='outlined'
              label="Email"
              sx={{ mb: 2 }}
              name='email'
              onChange={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              helperText={touched.email && errors.email}
              error={touched.email && Boolean(errors.email)}
              fullWidth
            />
            <TextField
              variant='outlined'
              label="Password"
              sx={{ mb: 2 }}
              name='password'
              onChange={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              helperText={touched.password && errors.password}
              error={touched.password && Boolean(errors.password)}
              type={isVisible ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setIsVisible(!isVisible)}>
                      {isVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              fullWidth
            />
            <TextField
              variant='outlined'
              label="Password Confirm"
              sx={{ mb: 2 }}
              name='passwordConfirmation'
              onChange={handleChange("passwordConfirmation")}
              onBlur={handleBlur("passwordConfirmation")}
              value={values.passwordConfirmation}
              type={isVisibleConfirmation ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setIsVisibleConfirmation(!isVisibleConfirmation)}>
                      {isVisibleConfirmation ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              helperText={touched.passwordConfirmation && errors.passwordConfirmation}
              error={touched.passwordConfirmation && Boolean(errors.passwordConfirmation)}
              fullWidth
            />
            <Button
              variant='contained'
              endIcon={<SendIcon />}
              onClick={handleSubmit}
              disabled={isLoading}
              color='default'
              fullWidth
              className="mt-4"
            >
              Register
            </Button>
            <div className='mt-4 text-center'>
              <Link to="/login" className='text-gray hover:underline'>
                Have an Account? <span className='text-blue-400'>Login Now!</span>
              </Link>
            </div>
          </Paper>
        )}
      </Formik>
    </div>
  );
}

export default Register;
