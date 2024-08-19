import { useEffect } from "react";
import { PropTypes } from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import "./bienvenida.css"; 

const Bienvenida = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); 
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="bienvenida d-flex justify-content-center align-items-center position-relative vh-100 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.2 }}
        transition={{ duration: 1 }}
      >
<div className="container-fluid p-0">
  <div className="bg-image" style={{ backgroundImage: `url('https://img.freepik.com/foto-gratis/cocteles-frescos-lima-fruta-mesa-ia-generativa_188544-12368.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1723161600&semt=ais_hybrid')` }}>
    <div className="overlay"></div>
  </div>
  </div>

        <h1>Bienvenido a Elixir & Bites</h1>
        <img
          src="https://thumbs.dreamstime.com/b/logo-de-comida-y-bebida-en-un-fondo-negro-vector-170720068.jpg"
          className="centered-bottom-image"
        ></img>
      </motion.div>
    </AnimatePresence>
  );
};



Bienvenida.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default Bienvenida;
