import PropTypes from "prop-types";

const InputLR = (props) => {
  const { name, type = "text", error, register, options, placeholder = "Ingrese un texto", icon } = props;

  return (
    <>
      <input
        className={`form-style ${error ? "is-invalid" : ""}`}
        id={`${name}-input`}
        type={type}
        placeholder={placeholder}
        {...register(name, options)} 
        />
     {error ? (
      <i className={`input-icon-error bi bi-exclamation-diamond-fill `}></i>
) : (
  icon && <i className={`input-icon ${icon}`}></i>
)}
  {error ? ( <p className="text-white">Revise el campo</p> ) : ( <p></p>)}
        </>
  );
};

export default InputLR;

InputLR.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  className: PropTypes.string,
  register: PropTypes.func.isRequired,
  options: PropTypes.object,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
};