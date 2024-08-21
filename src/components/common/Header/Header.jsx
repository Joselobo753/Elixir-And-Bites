import { Link } from "react-router-dom";


import Logo from "./Logo";
import RedesSociales from "./RedesSociales";

const Header = () => {
  return (
    <nav className="navbar bg-body-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">
        <img
          src="../../../../public/potion.svg"
          alt="Logo"
          width="30"
          height="24"
          className="d-inline-block align-text-top"
        />
        Elixir and Bites
      </Link>
      <button
        className="btn"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header d-flex justify-content-between align-items-start">
          <div className="flex-grow-1 d-flex justify-content-center">
            <Logo />
          </div>
          <button
            type="button"
            className="btn-close mt-2 me-2"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="">
          <RedesSociales />
          
        </div>
        <div className="text-center mt-2">
          <button className="bg-dark px-5 rounded">
            <h3 className="text-white">Acerca de nosotros</h3>
          </button>
        </div>
      </div>
    </div>
  </nav>
  );
};
export default Header;
