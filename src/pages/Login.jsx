import { Button, TextField, IconButton, InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import SendIcon from "@mui/icons-material/Send";
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from "yup";
import bgImage from "../assets/images/pexels-shvetsa-4557388.jpg";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { userLogin } from '../store/features/userSlice';
import { hashToken } from '../helpers/utilityFunctions';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const loginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required!")
    .min(3, "Username is too short!").max(15, "Username is too long!"),
  password: Yup.string().required("Password is required!")
    .min(4, "Password is too short!")
});

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);

  const handleLogin = async (value) => {
    await axios.post("http://localhost:9000/user/login", value)
      .then(res => {
        if (res.data.status) {
          toast.success(res.data.message);
          dispatch(userLogin(res.data.user));
          let token = hashToken(res.data.access_token);
          localStorage.setItem("access_token", token);
          navigate("/");
        }
      })
      .catch(err => {
        if (err.response.data.status === false) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something went wrong, Please Try Again");
        }
      });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen"
    >
      {/* Left side: Background image */}
      <div 
        className="w-full md:w-1/2 h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Right side: Sign-in form */}
      <div className="w-full md:w-1/2 h-full flex justify-center items-center p-4 md:p-8"
      style={{  backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(values) => handleLogin(values)}
            validationSchema={loginSchema}
          >
            {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
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
                  label="Password"
                  sx={{ mb: 2 }}
                  name='password'
                  onChange={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  helperText={touched.password && errors.password}
                  error={touched.password && Boolean(errors.password)}
                  fullWidth
                  type={isVisible ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() => setIsVisible(!isVisible)}
                        >
                          {isVisible ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type='submit'
                  variant='outlined'
                  endIcon={<SendIcon />}
                  disabled={isLoading}
                  color='default'
                  fullWidth
                >
                  Login
                </Button>
                <div className='flex flex-col md:flex-row justify-between mt-4'>
                  <Link to="/forgot-password" className='text-blue-400 mb-2 md:mb-0'>Forgot Password?</Link>
                  <Link to="/register" className='text-blue-400 hover:underline'>Create an Account Now!</Link>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
