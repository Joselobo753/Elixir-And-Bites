import "./principal.css";

const PaginaPrincipal = () => {
  return (
    <>
      <header>
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img
                src="../../../../public/potion.svg"
                alt="Logo"
                width="30"
                height="24"
                className="d-inline-block align-text-top"
              />
              Bootstrap
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
                  <a className="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Features
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Pricing
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" aria-disabled="true">
                    Disabled
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>

        <div className="imagen-inicio">
        <img src="https://www.montpellier-tourisme.fr/app/uploads/montpelliertourisme/2022/11/thumbs/bar-g75e07b9f9_1920-1920x960-crop-1668432243.jpg"></img>
        </div>

      </main>
      <footer></footer>
    </>
  );
};

export default PaginaPrincipal;
