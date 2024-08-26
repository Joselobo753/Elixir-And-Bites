import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types";
import "../FooterNavbar/footerNavBar.css"


const FooterNavbar = ({ totalAmount, onCartClick }) => {
    return (
        <div className="navbar-footer">
          <div className="content-footer">
            <span className="item-footer ">
                Total: <strong>${totalAmount.toFixed(2)}</strong>
              </span>
            <div className="footer-icon" onClick={onCartClick}>
            <FontAwesomeIcon icon={faShoppingCart} />
            </div>
          </div>
        </div>
      );
    };

FooterNavbar.propTypes = {
  totalAmount: PropTypes.number.isRequired,
  onCartClick: PropTypes.func.isRequired,  
};

export default FooterNavbar;