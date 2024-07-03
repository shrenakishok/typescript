import React, { useState, useEffect } from 'react';
import { Grid, Paper, Avatar, Typography, Link, TextField } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { FormControlLabel, Checkbox, Button } from '@mui/material';
import { Formik, Form, Field, ErrorMessage, FormikErrors } from 'formik';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';

const defaultPaperStyle = { padding: 20, height: '58vh', width: 450, margin: '20px auto' };
const errorPaperStyle = { padding: 20, height: '64vh', width: 450, margin: '20px auto' };
const avatarStyle = { backgroundColor: "#1976d2" };
const userStyle = { paddingBottom: 20 };
const textStyle = { paddingBottom: 10 };
const linkStyle1 = { fontSize: "14px", paddingTop: 10 };
const linkStyle2 = { fontSize: "14px", paddingTop: 20 };

function validateEmail(value: string) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}

export const Login = () => {
  const [paperStyle, setPaperStyle] = useState(defaultPaperStyle);
  const [hasErrors, setHasErrors] = useState(false);

  const initialValues = {
    email: '',
    password: '',
    remember: false
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Field is required'),
    password: Yup.string().required('Field is required')
  });

  const onSubmit = (values: typeof initialValues) => {
    console.log(values);
  };

  useEffect(() => {
    document.title = 'Login';
  }, []);

  useEffect(() => {
    setPaperStyle(hasErrors ? errorPaperStyle : defaultPaperStyle);
  }, [hasErrors]);

  const handleValidation = (errors: FormikErrors<typeof initialValues>) => {
    setHasErrors(!!errors.email || !!errors.password);
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
                <Typography style={textStyle} variant="h3">Sign In</Typography>
              </Grid>
              <Form>
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
                <Grid container justifyContent="flex-end">
                  <Typography style={linkStyle1}>
                    <Link component={RouterLink} to="#" underline="none">Forgot Password?</Link>
                  </Typography>
                </Grid>
                <FormControlLabel
                  style={userStyle}
                  control={<Field as={Checkbox} name="remember" color="primary" />}
                  label="Remember me"
                />
                <Button type="submit" variant="contained" fullWidth>Submit</Button>
              </Form>
              <Typography style={linkStyle2}> Don't have an account?
                <Link component={RouterLink} to="/signup" paddingLeft={0.5} underline="none">Create Account</Link>
              </Typography>
            </Paper>
          );
        }}
      </Formik>
    </Grid>
  );
};

export default Login;
