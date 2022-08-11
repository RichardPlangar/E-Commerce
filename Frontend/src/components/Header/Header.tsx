import './Header.scss';
import logo from './assets/vector-geometric-illustration-octopus-cosmic-planets/569.png';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <div className="header-container">
      <div className="logo">
        <img src={logo} alt="company logo"></img>
        <h2>BlueSkie</h2>
      </div>
      <div className="button-container">
        <TextField
          className="search-bar"
          variant="standard"
          label="Search"
          sx={{ input: { color: '#05386b' } }}
        ></TextField>
        <Button
          className="button"
          variant="outlined"
          size="large"
          component={Link}
          to="/login"
        >
          Login
        </Button>
        <Button
          className="button"
          variant="outlined"
          size="large"
          component={Link}
          to="/register"
        >
          Sign up
        </Button>
      </div>
    </div>
  );
};
export default Header;
