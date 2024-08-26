import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import "../FooterNavbar/cartModal.css";
import Swal from 'sweetalert2';
import Input from "../ui/input/Input";
import { useForm } from "react-hook-form";

const CartModal = ({ cart, totalAmount, onClose, onRemoveFromCart, onConfirm, tableNumber: initialTableNumber }) => {
  const {
    register,
    formState: { errors },
  } = useForm();

  const [resetCount, setResetCount] = useState(false);
  const [tableNumber, setTableNumber] = useState(initialTableNumber || '');  // Usamos el número de mesa si ya existe
  const [comment, setComment] = useState('');
  const [isConfirmEnabled, setConfirmEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Solo validamos el número de mesa si no existe uno ya confirmado
    if (!initialTableNumber) {
      const number = parseInt(tableNumber, 10);
      if (tableNumber.trim() === '' || isNaN(number) || number < 1 || number > 20) {
        setConfirmEnabled(false);
        setErrorMessage('Por favor ingrese un número válido entre 1 y 20.');
      } else {
        setConfirmEnabled(true);
        setErrorMessage('');
      }
    } else {
      setConfirmEnabled(true);  // Si ya hay un número de mesa, habilitamos la confirmación
    }
  }, [tableNumber, initialTableNumber]);

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
        cancelButtonText: 'Cancelar',
      });

      if (isConfirmed) {
        onConfirm(tableNumber, comment);
        setTableNumber('');
        setComment('');
        setResetCount(true);
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
      cancelButtonText: 'Cancelar',
    });

    if (isConfirmed) {
      onRemoveFromCart(id);
    }
  };

  return (
    <div className="cart modal-overlay text-light">
      <div className="cart-modal">
        <h2>Carrito</h2>
        {cart.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <table className="table-responsive py-2">
            <thead>
              <tr>
                <th scope="col">Imagen</th>
                <th scope="col">Nombre</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Total</th>
                <th scope="col">🗑</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="img-fluid cart-modal-image"
                      style={{ width: "50px" }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Solo pedimos el número de mesa si no existe ya */}
        {!initialTableNumber && (
          <div className="form-group">
            <input
              type="number"
              placeholder="Ingrese el número de mesa"
              value={tableNumber}
              onChange={handleTableNumberChange}
              className="form-style"
            />
            <i className={`input-icon bi bi-hash`}></i>
            <div className="py-2">
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
          </div>
        )}

        {initialTableNumber && (
          <div className="form-group">
            <h5 className="title-enfasis">Número de mesa: {initialTableNumber}</h5>
          </div>
        )}

        <Input
          className="m-3 textarea-contacto"
          error={errors.message}
          label="Mensaje"
          name="message"
          options={{
            required: {
              value: true,
              message: "El mensaje es requerido",
            },
            minLength: {
              value: 10,
              message: "El campo mensaje debe tener al menos 10 caracteres",
            },
            maxLength: {
              value: 500,
              message: "El campo mensaje debe tener un máximo de 500 caracteres",
            },
            pattern: {
              value: /^[A-Za-zñÑáéíóúÁÉÍÓÚ0-9\s.,!?()-]+$/,
              message: "El campo mensaje solo puede contener letras, números y ciertos caracteres de puntuación (. , ! ? () -)",
            },
            validate: {
              noExtraSpaces: (value) =>
                !/\s{2,}/.test(value) || "El campo mensaje no puede contener múltiples espacios consecutivos",
              noOnlySpaces: (value) =>
                value.trim().length > 0 || "El campo mensaje no puede estar compuesto solo de espacios en blanco",
            },
          }}
          register={register}
          textarea
          placeholder="Escriba un mensaje, recuerde, aquí no se piden los números a las camareras"
          maxLength={500}
          resetCount={resetCount}
          onChange={handleCommentChange}
        />

        <div className="modal-footer">
          <h3>Total: ${totalAmount.toFixed(2)}</h3>
          <button className="btn btn-secondary" onClick={onClose}>
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
  tableNumber: PropTypes.string, // Añadimos la prop `tableNumber`
};

export default CartModal;
