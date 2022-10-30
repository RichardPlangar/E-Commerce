import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';
import BuildOutlined from '@mui/icons-material/BuildOutlined';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
import './CategoriesIcon.scss';
import { useState, useEffect } from 'react';

const CategoriesIcon: React.FC = () => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/category')
      .then((response) => response.json())
      .then((categories) => setCategoryList(categories));
  });

  return (
    <div className="category-container">
      <div className="real-estate">
        <HomeOutlinedIcon fontSize="large" />
        <p>{categoryList[0]}</p>
      </div>
      <div className="vehicle">
        <DirectionsCarFilledOutlinedIcon fontSize="large" />
        <p>{categoryList[1]}</p>
      </div>
      <div className="home">
        <ChairOutlinedIcon fontSize="large" />
        <p>{categoryList[2]}</p>
      </div>
      <div className="tools">
        <BuildOutlined fontSize="large" />
        <p>{categoryList[3]}</p>
      </div>
      <div className="fashion">
        <CheckroomOutlinedIcon fontSize="large" />
        <p>{categoryList[4]}</p>
      </div>
    </div>
  );
};

export { CategoriesIcon };
