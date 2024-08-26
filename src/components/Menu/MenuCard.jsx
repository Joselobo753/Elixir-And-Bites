import PropTypes from "prop-types";
import { useState } from "react";
import "../Menu/menu.css"

const MenuCard = ({ menu, addToCart }) => {
  const [quantity, setQuantity] = useState(0); 

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 0 ? quantity - 1 : 0);

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(menu, quantity);
      setQuantity(0); 
    }
  };

  return (
    <div className=" col-12 mb-3 card-styles  text-light row">
      <div className="row">
        
      
      <img
        src={menu.imageUrl}
        alt={menu.name}
        className="col-6 image-class"
      />
      <div className=" col-6">
        <h5 className="title-enfasis ">{menu.name}</h5>
        <p className="  text-light">{menu.description}</p>
        <h5 className="  title-enfasis">$ {menu.price}</h5>
       </div>
     </div>
     <div className="py-1 d-flex justify-content-between">
      <div className="quantity-div">

     
  <button
    className="button-quantity"
    onClick={decreaseQuantity}
    disabled={quantity === 0}
  >
    ➖
  </button>
  <span className="mx-3">{quantity}</span>
  <button className="button-quantity" onClick={increaseQuantity}>
    ➕
  </button> </div>
  {quantity > 0 && (
    <div className="text-end">

    <button
      className="button-card"
      onClick={handleAddToCart}
      >
      Añadir al 🛒
    </button>
      </div>
  )}
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