import PropTypes from 'prop-types';
import ButtonsLink from "./buttonsLink"
import "./header.css"
const HeaderUser = ({user}) => {
  return (
    <div>
        <section className="py-4">
        <h2>Bienvenido {user.name}</h2>
        <ButtonsLink/>
        <div className="d-flex justify-content-between py-5 px-3">
            <button className="btn btn-dark">Editar usuario</button>
            <button className="button-cerrar">cerrar sesion</button>
        </div>
        </section>
    </div>
  )
}
export default HeaderUser
HeaderUser.propTypes = {
  user: PropTypes.string.isRequired, 
};