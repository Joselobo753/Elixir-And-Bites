import { Link } from "react-router-dom";

import "./header.css";
import Logo from "./Logo";
import RedesSociales from "./RedesSociales";
import HeaderUser from "./HeaderUser";
import HeaderAdmin from "./HeaderAdmin";
import ButtonsLink from "./buttonsLink";
import { useSession } from "../../../constans/Stores/useSesion";
import { useRef } from "react";

const Header = () => {
  const {user,isLoggedIn} = useSession()
  const closeButtonRef = useRef(null);
  const handleCloseButtonClick = () => {
    if (closeButtonRef.current) {
      closeButtonRef.current.click();
    }
  };
  return (
    <nav className="navbar bg-body-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="/potion.svg"
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
          Elixir and Bites
        </Link>
        <button
          className="btn-close btn-vio btn-hamb pt-2 pe-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        ></button>

        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
          ref={closeButtonRef}
        >
          <div className="offcanvas-header d-flex justify-content-between align-items-start">
            

            <button
              type="button "
              className="btn-close mt-2 me-2 btn-vio"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              
            </button>
          </div>
              <Logo onClose={handleCloseButtonClick}/>
              <div className="text-center">
            {user && user.isAdmin ? "" : <RedesSociales onClose={handleCloseButtonClick}/>}
            <div>
              {isLoggedIn ? (
                user && user.isAdmin ? (
                  <HeaderAdmin onClose={handleCloseButtonClick} />
                ) : (
                  <HeaderUser user={user} onClose={handleCloseButtonClick} />
                )
              ) : (
                <ButtonsLink onClose={handleCloseButtonClick} />
              )}
            </div>
          </div>
          
        </div>
      </div>
    </nav>
  );
};
export default Header;
