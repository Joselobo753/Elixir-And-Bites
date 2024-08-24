import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import "../FooterNavbar/cartModal.css"

const CartModal = ({ cart, totalAmount, onClose, onRemoveFromCart, onConfirm }) => {
  const [tableNumber, setTableNumber] = useState('');
  const [isConfirmEnabled, setConfirmEnabled] = useState(false);

  useEffect(() => {
    setConfirmEnabled(tableNumber.trim() !== '');
  }, [tableNumber]);

  const handleTableNumberChange = (e) => {
    setTableNumber(e.target.value);
  };

  const handleConfirm = () => {
    if (isConfirmEnabled) {
        console.log("Confirmando pedido para la mesa:", tableNumber); 
      onConfirm(tableNumber);
      setTableNumber(''); // Limpiar el número de mesa después de confirmar
    }
  };

  return (
    <div className="modal-carrito modal-overlay text-light ">
      <div className="carta-modal">
        <h2>Carrito</h2>
        {cart.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <ul className="lista-carta">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="carta-modal-image"
                />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Precio: ${item.price.toFixed(2)}</p>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => onRemoveFromCart(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <input
          type="text"
          placeholder="Ingrese el número de mesa"
          value={tableNumber}
          onChange={handleTableNumberChange}
        />
        <div className="modal-footer">
          <h3>Total: ${totalAmount.toFixed(2)}</h3>
          <button
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cerrar
          </button>
          <button
            className="btn btn-primary"
            onClick={handleConfirm}
            disabled={cart.length === 0 || !isConfirmEnabled}
          >
            Confirmar Pedido
          </button>
        </div>
      </div>
    </div>
  );
};

CartModal.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  totalAmount: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default CartModal;