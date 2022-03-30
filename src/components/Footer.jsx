import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.png';
import exploreIcon from '../images/exploreIcon.png';
import mealIcon from '../images/mealIcon.png';
import '../style/footer.css';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/bebidas">
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drink icon"
        />
      </Link>
      <Link to="/explorar">
        <img
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="explore icon"
        />
      </Link>
      <Link to="/comidas">
        <img
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="meal icon"
        />
      </Link>
    </footer>
  );
}

export default Footer;
