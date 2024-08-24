import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import "../FooterNavbar/cartModal.css"
import Swal from 'sweetalert2';

const CartModal = ({ cart, totalAmount, onClose, onRemoveFromCart, onConfirm }) => {
  const [tableNumber, setTableNumber] = useState('');
  const [comment, setComment] = useState('');
  const [isConfirmEnabled, setConfirmEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Validar que el número de mesa sea un número y esté dentro del rango permitido
    const number = parseInt(tableNumber, 10);
    if (tableNumber.trim() === '' || isNaN(number) || number < 1 || number > 20) {
      setConfirmEnabled(false);
      setErrorMessage('Por favor ingrese un número válido entre 1 y 20.');
    } else {
      setConfirmEnabled(true);
      setErrorMessage('');
    }
  }, [tableNumber]);

  const handleTableNumberChange = (e) => {
    setTableNumber(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleConfirm = async () => {
    if (isConfirmEnabled) {

      const { isConfirmed } = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas confirmar el pedido?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#25d366",
        confirmButtonText: 'Sí, confirmar',
        cancelButtonText: 'Cancelar'
      });

      if (isConfirmed) {
        onConfirm(tableNumber, comment);
        setTableNumber('');
        setComment('');
      }
    }
  };

  const handleRemoveFromCart = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Eliminar ítem?',
      text: '¿Estás seguro de que quieres eliminar este ítem del carrito?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#25d366",
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (isConfirmed) {
      onRemoveFromCart(id);
    }
  };

  return (
    <div className="cart modal-overlay text-light ">
      <div className="cart-modal">
        <h2>Carrito</h2>
        {cart.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <ul className="list-cart">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="cart-modal-image"
                />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Precio: ${item.price.toFixed(2)}</p>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    className="btn"
                    onClick={() => handleRemoveFromCart(item.id)}
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
          placeholder="Ingrese el número de mesa (1-20)"
          value={tableNumber}
          onChange={handleTableNumberChange}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
                <textarea
          placeholder="Deja un comentario (opcional)"
          value={comment}
          onChange={handleCommentChange}
          rows="4"
          style={{ width: '100%', marginBottom: '10px' }}
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