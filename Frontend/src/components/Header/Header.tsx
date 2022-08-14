import './Header.scss';
import logo from './assets/vector-geometric-illustration-octopus-cosmic-planets/569.png';
import Button from '@mui/material/Button';
import { Badge, TextField, IconButton } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
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
        <Link className="contact" to="/contact">
          Contact
        </Link>
        <Link className="delivery" to="/delivery">
          Delivery
        </Link>
        <Link className="login" to="/login">
          Login
        </Link>

        <Button
          className="button"
          variant="outlined"
          size="large"
          component={Link}
          to="/register"
        >
          Get started
        </Button>
        <Link to="/cart">
          <IconButton>
            <Badge badgeContent={1} color="secondary" overlap="circular">
              <ShoppingCartOutlinedIcon className="shopping-cart"></ShoppingCartOutlinedIcon>
            </Badge>
          </IconButton>
        </Link>
      </div>
    </div>
  );
};
export default Header;
