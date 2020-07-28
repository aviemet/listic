import React from 'react';
import { Link } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import fire from 'lib/fire'

import { has } from 'lodash'
import { useForm } from 'react-hook-form'

import { loginStyles } from './styles'
import routes from 'Routes/routes';
import { useNamedRoutes } from 'lib/NamedRoutes';

const Login = () => {
  const { register, errors, handleSubmit } = useForm()
  const routes = useNamedRoutes()

  const onSubmit = data => {
    fire.auth().signInWithEmailAndPassword(data.email, data.password).catch(error => {
      console.error({ error })
    });
  }

	const classes = loginStyles();

  return (
    <Container component="main" maxWidth="xs">
      
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={ handleSubmit(onSubmit) }>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={ has(errors, 'email') }
            helperText={ errors.email && errors.email.message }
            inputRef={ register({
              required: "Value Required"
            }) }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={ has(errors, 'password') }
            helperText={ errors.password && errors.password.message }
            inputRef={ register({
              required: "Value Required"
            }) }
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to={ routes.register() }>"Don't have an account? Sign Up"</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Login