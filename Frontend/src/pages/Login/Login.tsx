import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Login.scss';

const Login: React.FC = () => {
  const [{ username, password }, setCredentials] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();
  const routeUser = () => {
    navigate('/');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userLoginData = new FormData(event.currentTarget);
    const username = userLoginData.get('username');
    const password = userLoginData.get('password');

    fetch(`http://localhost:3001/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.username) {
          toast.success('Login is successful!', {
            duration: 4000,
            position: 'top-center',
          });
          setTimeout(() => {
            routeUser();
          }, 2000);
        } else if (data.errors) {
          data.errors?.forEach((error: any) => {
            toast.error(`${error.msg} for ${error.param}`);
          });
        } else {
          toast.error(data.message, {
            duration: 4000,
            position: 'top-center',
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="main-container">
      <div className="sign-in">
        <Box
          className="form-container"
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <h1>Login</h1>
          <div className="input-wrapper">
            <TextField
              className="input-field"
              variant="standard"
              required
              label="username"
              name="username"
              onChange={(event) =>
                setCredentials({ username: event.target.value, password })
              }
            ></TextField>
            <TextField
              className="input-field"
              variant="standard"
              required
              type="password"
              label="password"
              name="password"
              onChange={(event) =>
                setCredentials({ username, password: event.target.value })
              }
            ></TextField>
            <div className="terms-and-condition">
              <p>Have no account? </p>
              <Link to="/register" className="clickable-link">
                <span>Register</span>
              </Link>
            </div>
          </div>
          <Button type="submit" variant="outlined">
            Login
          </Button>
        </Box>
      </div>
      <Toaster />
    </div>
  );
};
export default Login;
