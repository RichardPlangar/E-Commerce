import './Registration.scss';
import { Box, Button, Checkbox, TextField } from '@mui/material';
import React, { useState } from 'react';

const Registration: React.FC = () => {
  const [isChecked, setIsChecked] = useState(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);
  };
  return (
    <div className="register-container">
      <div className="sign-up">
        <Box className="form-container" component="form" autoComplete="off">
          <h1>Sign Up</h1>
          <div className="input-wrapper">
            <TextField
              className="input-field"
              variant="standard"
              required
              label="Username"
            ></TextField>
            <TextField
              className="input-field"
              variant="standard"
              required
              label="E-mail"
            ></TextField>
            <TextField
              className="input-field"
              variant="standard"
              required
              label="Password"
            ></TextField>
            <div className="terms-and-conditions">
              <p>Terms & Conditions </p>
              <Checkbox size="medium" onChange={handleChange}></Checkbox>
            </div>
          </div>
        </Box>
        <Button variant="outlined" disabled={isChecked}>
          Register
        </Button>
      </div>
    </div>
  );
};
export default Registration;
