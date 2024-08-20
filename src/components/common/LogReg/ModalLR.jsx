import Login from "./Login";
import Registro from "./Registro";
import "./LRstyle.css";

const ModalLR = () => {
  return (
    <div
      className="modal fade"
      id="modalLR"
      tabIndex="-1"
      aria-labelledby="ModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content text-center">
          
            <h6 className="mb-0 pb-3">
              <span>Log In</span>
              <span>Sign Up</span>
            </h6>
            <input
              className="checkbox"
              type="checkbox"
              id="reg-log"
              name="reg-log"
            />
            
            <label htmlFor="reg-log"></label>
            <div className="card-3d-wrap mx-auto">
              <div className="card-3d-wrapper">
                <div className="card-front">
                  <div className="center-wrap">
                    <Login/>
                    </div>
                </div>
                <div className="card-back">
                  <div className="center-wrap">
                   <Registro/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default ModalLR;
