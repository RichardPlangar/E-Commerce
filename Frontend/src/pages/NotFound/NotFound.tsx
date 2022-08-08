import './NotFound.scss';
import errorImg from './assets/404.png';
import Button from '@mui/material/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="content-container">
      <div className="error-message">
        <h2>Uh-Oh</h2>
        <h3>The page you are looking for does not exist!</h3>
        <h3>Hope, you will find something from the list below.</h3>
        <div className="button-container">
          <Button
            variant="contained"
            style={{ backgroundColor: '#2daae0', margin: '8px' }}
          >
            Test
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: '#2daae0', margin: '8px' }}
          >
            Test
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: '#2daae0', margin: '8px' }}
          >
            Test
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: '#2daae0', margin: '8px' }}
          >
            Test
          </Button>
          <Button variant="contained" style={{ backgroundColor: '#2daae0' }}>
            Test
          </Button>
        </div>
      </div>
      <div className="image-container">
        <img src={errorImg} alt="error 404"></img>
      </div>
    </div>
  );
};
