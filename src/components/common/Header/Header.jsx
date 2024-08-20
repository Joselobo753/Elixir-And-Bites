import "./header.css"
const Header = () => {
  return (
    <>         
    <header>
    <nav className="navbar navbar-light">
          <div className="container-fluid">
            <a className="navbar-brand text-white" href="#">
              <img
                src="../../../../public/potion.svg"
                alt="Logo"
                width="35"
                height="35"
                className="d-inline-block align-text-top"
              />
              Elixir & Bites
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a
                    className="nav-link active text-white"
                    aria-current="page"
                    href="#"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    Features
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    Pricing
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link disabled text-white"
                    aria-disabled="true"
                  >
                    Disabled
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>  
      </header> 

    </>

  )
}
export default Header
