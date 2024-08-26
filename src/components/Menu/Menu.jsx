import { useQuery } from "@tanstack/react-query";
import { getMenuFn } from "../../api/menu";
import MenuCard from "./MenuCard";
import "../Menu/menu.css";
import FooterNavbar from "../FooterNavbar/FooterNavBar";
import { useState } from "react";
import CartModal from "../FooterNavbar/CartModal";

const Menu = () => {
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const {
    data: menu = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["menu", selectedCategory],
    queryFn: () => getMenuFn(selectedCategory),
  });

  const filteredMenu = selectedCategory === 'all'
    ? menu
    : menu.filter((item) => item.category === selectedCategory);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const addToCart = (item, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        if (quantity === 0) {
          return prevCart.filter((cartItem) => cartItem.id !== item.id);
        }
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== id));
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCartClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmOrder = (number) => {
    setTableNumber(number);
    console.log("Pedido confirmado para la mesa:", number);
    setCart([]);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <p className="mt-2 text-center">Cargando datos...</p>;
  }

  if (isError) {
    return (
      <div className="alert alert-danger">
        Ocurrió un error cargando los datos
      </div>
    );
  }

  return (
    <div>
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="select-category category-dropdown"
      >
        <option value="all">Todas</option>
        <option value="Entradas">Entradas</option>
        <option value="Pizzas">Pizzas</option>
      </select>
        
      <div className="mx-2 menu-cart menu-grid">
        {filteredMenu.map((menuItem, index) => (
          <MenuCard
            menu={menuItem}
            index={index}
            addToCart={addToCart}
            key={menuItem.id}
          />
        ))}
      </div>
      <FooterNavbar
        totalAmount={totalAmount}
        onCartClick={handleCartClick}
        tableNumber={tableNumber} 
      />
      {isModalOpen && (
        <CartModal
          cart={cart}
          totalAmount={totalAmount}
          onClose={handleCloseModal}
          onRemoveFromCart={removeFromCart}
          onConfirm={handleConfirmOrder}
          tableNumber={tableNumber} 
        />
      )}
    </div>
  );
};

export default Menu;
