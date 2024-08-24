import { Link } from "react-router-dom";

const HeaderAdmin = () => {
  return (
    <div>
      <Link className="navbar-brand py-4" to="/admin">
        <h5 className="py-2">Administración de productos</h5>
      </Link>
      <Link className="navbar-brand py-4" to="/404">
        <h5>Gráficos de ventas</h5>
      </Link>
      <Link className="navbar-brand py-4" to="/404">
        <h5>Administración de clientes</h5>
      </Link>
      <Link className="navbar-brand py-4" to="/404">
        <h5>Administración administrativa</h5>
      </Link>
      <div className="text-end p-4">
        <button className="button-cerrar">Cerrar Sesión</button>
      </div>
    </div>
  );
};

export default HeaderAdmin;
