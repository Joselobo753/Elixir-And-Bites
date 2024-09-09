import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types";
import "../FooterNavbar/footerNavBar.css";
import { useSession } from '../../constans/Stores/useSesion';


const FooterNavbar = ({ totalAmount, onCartClick, tableNumber }) => {
  const { isLoggedIn } = useSession();
  
  return (
    <div className="navbar-footer">
        {isLoggedIn ? (
          <>
      <div className={`content-footer px-2 d-flex ${tableNumber ? 'justify-content-between' : 'justify-content-start'} align-items-center`}>
            <span className="item-footer">
              Total: <strong>${totalAmount.toFixed(2)}</strong>
            </span>

            {tableNumber && (
              <span className="item-footer">
                Mesa: <strong>{tableNumber}</strong>
              </span>
            )}

            <div className="footer-icon ms-auto" onClick={onCartClick}>
              <FontAwesomeIcon icon={faShoppingCart} />
            </div>
            </div>
          </>
        ) : (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
  <button
    type="button"
    data-bs-toggle="modal"
    data-bs-target="#modalLR"
    className="my-1 rounded-button"
  >
    Ingresar
  </button>
</div>
        )}
      
     
    </div>
    
  );
};

FooterNavbar.propTypes = {
  totalAmount: PropTypes.number.isRequired,
  onCartClick: PropTypes.func.isRequired,
  tableNumber: PropTypes.string,  
};

export default FooterNavbar;