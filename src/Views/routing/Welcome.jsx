import { useState } from 'react';
import Bienvenida from '../../components/Bienvenida/Bienvenida';
import PaginaPrincipal from '../../components/PaginaPrincipal/PaginaPrincipal';

const Welcome = () => {
    const [showMainPage, setShowMainPage] = useState(false);
  
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