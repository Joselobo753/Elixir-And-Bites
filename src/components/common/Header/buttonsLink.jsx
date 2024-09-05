import { Link } from "react-router-dom"

const ButtonsLink = (onClose) => {
  return (
    <div className="d-flex justify-content-center my-3 row">
            <Link to="/AboutUs" className="bg-dark rounded-button my-5" onClick={onClose}>
              <span>Acerca de nosotros</span>
            </Link>
            <Link to="/Contact" className="bg-dark  rounded-button"onClick={onClose}>
              <span>Contactanos</span>
            </Link>
           
          
          </div>
          
  )
}
export default ButtonsLink