import PropTypes from "prop-types";
import { useState } from "react";
import "../Menu/menu.css"

const MenuCard = ({ menu, addToCart }) => {
  const [quantity, setQuantity] = useState(0); // Estado para manejar la cantidad de productos

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 0 ? quantity - 1 : 0);

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(menu, quantity);
      setQuantity(0); // Opcional: Reiniciar cantidad después de añadir al carrito
    }
  };

  return (
    <div className="card mb-3">
      <img
        src={menu.imageUrl}
        alt={menu.name}
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">{menu.name}</h5>
        <p className="card-text">{menu.description}</p>
        <p className="card-text">${menu.price}</p>
        {/* Aquí puedes agregar botones o enlaces para acciones */}
        <div className="quantity-controls">
          <button className="btn btn-secondary" onClick={decreaseQuantity}>
            -
          </button>
          <span className="mx-3">{quantity}</span>
          <button className="btn btn-primary" onClick={increaseQuantity}>
            +
          </button>
          <button className="btn btn-success " onClick={handleAddToCart}>
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

MenuCard.propTypes = {
  menu: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price : PropTypes.number.isRequired,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default MenuCard;