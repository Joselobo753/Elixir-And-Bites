import { useState, useEffect } from 'react';
import Bienvenida from '../../components/Bienvenida/Bienvenida';
import PaginaPrincipal from '../../components/PaginaPrincipal/PaginaPrincipal';

const Welcome = () => {
    const [showMainPage, setShowMainPage] = useState(false);

    useEffect(() => {
      const headerElement = document.querySelector('header'); // Asumiendo que el header tiene un elemento <header>
      if (headerElement) {
        headerElement.style.display = showMainPage ? 'block' : 'none';
      }
    }, [showMainPage]);
  
    const handleWelcomeComplete = () => {
      setShowMainPage(true);
    };
  
    return (
      <div>
        {!showMainPage && <Bienvenida onComplete={handleWelcomeComplete} />}
        {showMainPage && <PaginaPrincipal />}
      </div>
    );
  };
export default Welcome