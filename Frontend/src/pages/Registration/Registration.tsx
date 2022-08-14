import './Registration.scss';
import { Box, Button, Checkbox, TextField } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import React, { useState } from 'react';

const Registration: React.FC = () => {
  const [isChecked, setIsChecked] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newUser = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password')?.toString(),
    };

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
              required
              label="Username"
              name="username"
            ></TextField>
            <TextField
              className="input-field"
              variant="standard"
              required
              label="E-mail"
              name="email"
            ></TextField>
            <TextField
              className="input-field"
              variant="standard"
              required
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
