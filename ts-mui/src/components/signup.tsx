import React, { useState, useEffect } from 'react';
import { Grid, Paper, Avatar, Typography, Link, TextField } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { FormControlLabel, Checkbox, Button } from '@mui/material';
import { Formik, Form, Field, ErrorMessage, FormikErrors } from 'formik';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';

const defaultPaperStyle = { padding: 20, height: '85vh', width: 450, margin: '20px auto' };
const errorPaperStyle = { padding: 20, height: '100vh', width: 450, margin: '20px auto' };
const avatarStyle = { backgroundColor: "#1976d2" };
const userStyle = { paddingBottom: 20 };
const textStyle = { paddingBottom: 10 };
const linkStyle = { fontSize: "14px", paddingTop: 25 };

function validateEmail(value: string) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}

export const Signup = () => {
  const [paperStyle, setPaperStyle] = useState(defaultPaperStyle);
  const [hasErrors, setHasErrors] = useState(false);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rePassword: ''
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Field is required'),
    lastName: Yup.string().required('Field is required'),
    email: Yup.string().email('Invalid email address').required('Field is required'),
    password: Yup.string()
      .required('Field is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[@$!%*?&#]/, 'Password must contain at least one special character'),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords do not match')
      .required('Field is required')
  });

  const onSubmit = (values: typeof initialValues) => {
    console.log(values);
  };

  useEffect(() => {
    document.title = 'Sign up';
  }, []);


  useEffect(() => {
    setPaperStyle(hasErrors ? errorPaperStyle : defaultPaperStyle);
  }, [hasErrors]);

  const handleValidation = (errors: FormikErrors<typeof initialValues>) => {
    setHasErrors(!!errors.firstName || !!errors.lastName || !!errors.email || !!errors.password || !!errors.rePassword);
  };

  return (
    <Grid container justifyContent="center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => {
          handleValidation(errors);

          return (
            <Paper elevation={10} style={paperStyle}>
              <Grid alignItems="center" container direction="column">
                <Avatar style={avatarStyle}><LockOutlined /></Avatar>
                <Typography style={textStyle} variant="h3">Sign Up</Typography>
              </Grid>
              <Form>
                <Field
                  as={TextField}
                  name="firstName"
                  label='First Name'
                  placeholder='Enter first name'
                  fullWidth
                  style={userStyle}
                  helperText={<ErrorMessage name="firstName" />}
                  error={touched.firstName && !!errors.firstName}
                />
                <Field
                  as={TextField}
                  name="lastName"
                  label='Last Name'
                  placeholder='Enter last name'
                  fullWidth
                  style={userStyle}
                  helperText={<ErrorMessage name="lastName" />}
                  error={touched.lastName && !!errors.lastName}
                />
                <Field
                  as={TextField}
                  name="email"
                  label='Email'
                  placeholder='Enter email'
                  fullWidth
                  style={userStyle}
                  helperText={<ErrorMessage name="email" />}
                  error={touched.email && !!errors.email}
                  validate={validateEmail}
                />
                <Field
                  as={TextField}
                  name="password"
                  label='Password'
                  placeholder='Enter password'
                  type='password'
                  fullWidth
                  style={textStyle}
                  helperText={<ErrorMessage name="password" />}
                  error={touched.password && !!errors.password}
                />
                <Field
                  as={TextField}
                  name="rePassword"
                  label='Confirm Password'
                  placeholder='Re-enter password'
                  type='password'
                  fullWidth
                  style={textStyle}
                  helperText={<ErrorMessage name="rePassword" />}
                  error={touched.rePassword && !!errors.rePassword}
                />
                <FormControlLabel
                  style={userStyle}
                  control={<Field as={Checkbox} name="remember" color="primary" />}
                  label="Remember me"
                />
                <Button type="submit" variant="contained" fullWidth>Create Account</Button>
              </Form>
              <Typography style={linkStyle}> Already have an account?
                <Link component={RouterLink} to="/login" paddingLeft={0.5} underline="none">Sign In</Link>
              </Typography>
            </Paper>
          );
        }}
      </Formik>
    </Grid>
  );
};

export default Signup;
