import PropTypes from "prop-types";
import InputLR from "../common/LogReg/InputLR";
import "./Admin.css";
import Input from "../ui/input/Input";

const ProductForm = ({ initialData, onSubmit, onCancel, register, handleSubmit, reset, errors, watch }) => {
  const validateNoExtraSpaces = (value) => !/\s{2,}/.test(value) || "No puede haber múltiples espacios consecutivos";
  const validateNoConsecutiveLetters = (value) => !/(.)\1/.test(value) || "No se permiten letras consecutivas iguales";

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();  
  };
  const cancel = ()=> {
    onCancel();
    reset()
  }
  
  return (
    <form className="admin-form row" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="row">
        <InputLR
          name="name"
          placeholder="Nombre del Producto"
          icon="bi bi-basket"
          error={errors.name}
          register={register}
          divClass="col-12 col-md-6"
          options={{
            required: "El nombre del producto es obligatorio",
            pattern: {
              value: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/,
              message: "El nombre solo debe tener letras",
            },
          }}
        />

        <InputLR
          name="price"
          type="number"
          placeholder="Precio"
          icon="bi bi-currency-euro"
          error={errors.price}
          register={register}
          divClass="col-12 col-md-6"
          options={{
            required: "El precio es obligatorio",
            pattern: {
              value: /^(1000|[1-9]\d{3,4})(\.\d{1,2})?$/,
              message:
                "El precio debe ser un número entre 1000 y 100000 con hasta dos decimales.",
            },
          }}
        />

        <div className="py-2">
          <InputLR
            name="imageUrl"
            type="url"
            placeholder="Imagen (URL)"
            icon="bi bi-image-fill"
            error={errors.imageUrl}
            register={register}
            options={{
              required: "La URL de la imagen es obligatoria",
              pattern: {
                value: /^.*.(jpg|jpeg|png|gif|bmp|webp)$/,
                message: "Debe ser una url valida",
              },
            }}
          />
        </div>

        <div className="py-2">
          <Input
            className="m-3 textarea-contacto"
            error={errors.message}
            label="Mensaje"
            name="description"
            options={{
              required: { value: true, message: "El descripcion es requerido" },
              minLength: { value: 10, message: "El campo descripcion debe tener al menos 10 caracteres" },
              maxLength: { value: 500, message: "El campo descripcion debe tener un máximo de 500 caracteres" },
              pattern: {
                value: /^[A-Za-zñÑáéíóúÁÉÍÓÚ0-9\s.,!?()-]+$/,
                message: "El campo descripcion solo puede contener letras, números y ciertos caracteres de puntuación (. , ! ? () -)"
              },
              validate: {
                noExtraSpaces: validateNoExtraSpaces,
                noOnlySpaces: (value) => value.trim().length > 0 || "El campo descripcion no puede estar compuesto solo de espacios en blanco",
                noConsecutiveLetters: validateNoConsecutiveLetters
              }
            }}
            register={register}
            textarea
            placeholder="Escriba una descripcion"
            maxLength={300}
          />
        </div>
        <div className="col-12 col-md-6 pb-2">
          <div className="form-style">
            <div className="form-check-inline d-flex justify-content-evenly">
              <div className="mx-3">
                <input
                  type="checkbox"
                  id="available"
                  {...register("available")}
                  className="form-check-input"
                />
              </div>
              <label htmlFor="available" className="form-check-label">
                {watch("available") ? "Disponible" : "No disponible"}
              </label>
            </div>
          </div>
        </div>
        <div className="form-group col-12 col-md-6 ">
          <select
            className="form-style"
            id="category"
            {...register("category", {
              required: "La categoría es obligatoria",
            })}
          >
            <option value="" disabled>
              Categorías
            </option>
            <option value="burgers">Burgers</option>
            <option value="entrantes">Entrantes</option>
            <option value="tragos">Tragos</option>
            <option value="bebidas">Bebidas</option>
            <option value="cervezas">Cervezas</option>
          </select>
          {errors.category && (
            <p className="text-white text-start">{errors.category.message}</p>
          )}
        </div>
      </div>
      <div className="form-group pt-3 mt-auto d-flex justify-content-around">
        <div className="col-12 d-flex justify-content-around mt-4">
          <button className="button-card" type="submit">
            {initialData ? "Actualizar Producto" : "Agregar Producto"}
          </button>
          <button
            className="btn text-white"
            type="button"
            onClick={() => {
              cancel()
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
};

ProductForm.propTypes = {
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  errors: PropTypes.object,
  watch: PropTypes.func.isRequired,
};

export default ProductForm;