import { Button, InputAdornment, TextField, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import SendIcon from "@mui/icons-material/Send";
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Validation schema for email
const emailSchema = Yup.object().shape({
  email: Yup.string().required("Email is required!").email("Invalid Email"),
});

function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle password reset request
  const handleSendMail = async (values) => {
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:9000/user/reset-password-request", values);
      if (res.data.status) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
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
        initialValues={{ email: "" }}
        onSubmit={(values) => handleSendMail(values)}
        validationSchema={emailSchema}
      >
        {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
          <Paper elevation={9} className="p-6 md:p-8 rounded-lg  text-white max-w-md w-full">
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              Forgot Password
            </Typography>
            <TextField
              variant='outlined'
              label="Email"
              fullWidth
              margin="normal"
              name='email'
              onChange={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              helperText={touched.email && errors.email}
              error={touched.email && Boolean(errors.email)}
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
              Send Mail
            </Button>
            <div className='mt-4 text-end'>
              <Link to="/login" className='text-neutral-500 hover:underline'>
                Have an Account? <span className='text-blue-400'>Login Now!</span>
              </Link>
            </div>
          </Paper>
        )}
      </Formik>
    </div>
  );
}

export default ForgotPassword;

