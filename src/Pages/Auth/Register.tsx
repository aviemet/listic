import React from 'react';
import { 
	Avatar,
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	Grid,
	Box,
	Typography,
	Container
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { has } from 'lodash'
import { useAuth } from 'data'

import Copyright from 'Components/Copyright'
import { useNamedRoutes } from 'rr-named-routes';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const auth = useAuth()
  const routes = useNamedRoutes()

  const { register, errors, handleSubmit, watch } = useForm()

  const onSubmit = data => {
    if(data.password !== data.passwordCheck) return

    auth.register(data.email, data.password).catch(error => {
      console.error({ error })
    })
  }

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">

      <div className={classes.paper}>

        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">Sign up</Typography>

        <form className={classes.form} onSubmit={ handleSubmit(onSubmit) }>

          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={ has(errors, 'email') }
                helperText={ errors.email && errors.email.message }
                inputRef={ register({
                  required: "Value Required"
                }) }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
                  required: "You must enter a password",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long"
                  }
                }) }
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordCheck"
                label="Verify Password"
                type="password"
                id="passwordCheck"
                error={ has(errors, 'passwordCheck') }
                helperText={ errors.passwordCheck && errors.passwordCheck.message }
                inputRef={ register({
                  validate: value => value === watch('password') || "Passwords don't match"
                }) }
              />
            </Grid>

          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Link to={ routes.login() }>Already have an account? Sign in</Link>
            </Grid>
          </Grid>

        </form>

      </div>

      <Box mt={5}>
        <Copyright />
      </Box>

    </Container>
  );
}