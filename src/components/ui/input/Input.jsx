import PropTypes from 'prop-types';

const Input = ({
  name,
  type = 'text',
  label,
  error,
  className = '',
  register,
  options,
  placeholder = 'Ingrese un texto',
  textarea = false,
  selectOptions = [],
  select = false
}) => {
  if (textarea) {
    return (
      <fieldset className={`form-group ${className}`}>
        <label htmlFor={`${name}-input`}>{label}</label>
        <textarea
          className={`form-control ${error ? 'is-invalid' : ''}`}
          id={`${name}-input`}
          placeholder={placeholder}
          {...register(name, options)}
        />
        {error && <div className='invalid-feedback'>{error.message}</div>}
      </fieldset>
    );
  }

  if (select) {
    return (
      <fieldset className={`form-group ${className}`}>
        <label htmlFor={`${name}-input`}>{label}</label>
        <select
          className={`form-control ${error ? 'is-invalid' : ''}`}
          id={`${name}-input`}
          {...register(name, options)}
        >
          <option value="">Selecciona una opción</option>
          {selectOptions.map((opt, index) => (
            <option key={index} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <div className='invalid-feedback'>{error.message}</div>}
      </fieldset>
    );
  }

  return (
    <fieldset className={`form-group ${className}`}>
      <label htmlFor={`${name}-input`}>{label}</label>
      <input
        className={`form-control ${error ? 'is-invalid' : ''}`}
        id={`${name}-input`}
        placeholder={placeholder}
        type={type}
        {...register(name, options)}
      />
      {error && <div className='invalid-feedback'>{error.message}</div>}
    </fieldset>
  );
};

Input.propTypes = {
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
  textarea: PropTypes.bool,
  select: PropTypes.bool,
  selectOptions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
};

export default Input;
