import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Test.style.scss';

function Test() {
  return (
    <div className="main-container">
      <div className="sign-in">
        <Box className="form-container" component="form" autoComplete="off">
          <h1>Login</h1>
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
              label="Password"
            ></TextField>
            <p>
              Have no account? <span className="clickable-link">Register</span>
            </p>
          </div>
        </Box>
        <Button variant="outlined">Login</Button>
      </div>
    </div>
  );
}
export default Test;
