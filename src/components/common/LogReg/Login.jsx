const Login = () => {
  return (
    <div className="section text-center">
      <h4 className="mb-4 pb-3 text-white">Ingresar</h4>
      <div className="form-group">
        <input
          type="email"
          name="logemail"
          className="form-style"
          placeholder="Your Email"
          id="logemail"
        />
        <i className="input-icon uil uil-at"></i>
      </div>
    </div>
  );
};
export default Login;
