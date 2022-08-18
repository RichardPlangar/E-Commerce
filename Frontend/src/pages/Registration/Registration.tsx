import './Registration.scss';
import { Box, Button, Checkbox, TextField } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../helper/authHelper';

const Registration: React.FC = () => {
  const [isChecked, setIsChecked] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);
  };

  const navigate = useNavigate();
  const routeUser = () => {
    navigate('/');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newUser = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password')?.toString(),
    };

    if (!newUser.username || !newUser.email || !newUser.password) {
      toast.error('Please fill out all the required fields!', {
        duration: 4000,
        position: 'top-center',
      });
      return;
    }

    if (!validateEmail(newUser.email)) {
      toast.error('Please use e-mail format for the e-mail address!', {
        duration: 4000,
        position: 'top-center',
      });
      return;
    }

    if (newUser.password!.length < 8) {
      toast.error('The password is too short!', {
        duration: 4000,
        position: 'top-center',
      });
      return;
    }

    fetch(`http://localhost:3001/register`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newUser),
    }).then((response) => {
      if (response.status === 200) {
        routeUser();
      } else {
        return response.json();
      }
    });
  };
  return (
    <div className="register-container">
      <div className="sign-up">
        <Box
          className="form-container"
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <h1>Sign Up</h1>
          <div className="input-wrapper">
            <TextField
              className="input-field"
              variant="standard"
              label="Username"
              name="username"
            ></TextField>
            <TextField
              className="input-field"
              variant="standard"
              label="E-mail"
              name="email"
            ></TextField>
            <TextField
              className="input-field"
              variant="standard"
              label="Password"
              type="password"
              name="password"
            ></TextField>
            <div className="terms-and-conditions">
              <p>Terms & Conditions </p>
              <Checkbox size="medium" onChange={handleChange}></Checkbox>
            </div>
          </div>
          <div className="button-register">
            <Button type="submit" variant="outlined" disabled={isChecked}>
              Register
            </Button>
          </div>
        </Box>
      </div>
      <Toaster />
    </div>
  );
};
export default Registration;
