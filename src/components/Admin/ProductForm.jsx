import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Admin.css";
import { useForm } from "react-hook-form";
import InputLR from "../common/LogReg/InputLR";
import Input from "../ui/input/Input";

const ProductForm = ({ initialData, onSubmit, onCancel }) => {
  const [resetCount, setResetCount] = useState(false);
  const {
    register,
   
    formState: { errors },
    
  } = useForm();
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    price: "",
    description: "",
    available: true,
    category: "burgers",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        imageUrl: "",
        price: "",
        description: "",
        available: true,
        category: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setResetCount(false)
  };
  

  return (
    <form className="form-container mt-2 text-center form-contacto" onSubmit={handleSubmit}>
     
      <InputLR
            error={errors.name}
            label="name"
            name="name"
            options={{
              required: { value: true, message: "Este campo es requerido" },
              minLength: 3,
              maxLength: 30,
            }}
            register={register}
            placeholder="Nombre del producto"
            icon="bi bi-basket"
            onChange={handleChange}
            value={formData.name}
          />
     
      <InputLR
            error={errors.imageUrl}
            label="imageUrl"
            name="imageUrl"
            options={{
              required: { value: true, message: "Este campo es requerido" },
              pattern: {
                value: /^.*.(jpg|jpeg|png|gif|bmp|webp)$/,
                message: "Debe ser una URL válida",
              },
            }}
            register={register}
            placeholder="Imagen del producto"
            icon="bi bi-image-fill"
            onChange={handleChange}
            value={formData.imageUrl}
          />
      
      <InputLR
            error={errors.price}
            label="price"
            name="price"
            options={{
              required: { value: true, message: "Este campo es requerido" },
              pattern: {
                minLength: 3,
              maxLength: 5,
              },
            }}
            type="number"
            register={register}
            placeholder="Precio del producto"
            icon="bi bi-currency-euro"
            onChange={handleChange}
            value={formData.price}
          />
      <Input
          className="m-3 textarea-contacto"
          error={errors.message}
          label="Mensaje"
          name="message"
          options={{
            required: {
              value: true,
              message: "El mensaje es requerido",
            },
            minLength: {
              value: 10,
              message: "El campo mensaje debe tener al menos 10 caracteres",
            },
            maxLength: {
              value: 500,
              message:
              "El campo mensaje debe tener un máximo de 500 caracteres",
            },
            pattern: {
              value: /^[A-Za-zñÑáéíóúÁÉÍÓÚ0-9\s.,!?()-]+$/,
              message:
              "El campo mensaje solo puede contener letras, números y ciertos caracteres de puntuación (. , ! ? () -)",
            },
            validate: {
              noExtraSpaces: (value) =>
                !/\s{2,}/.test(value) ||
              "El campo mensaje no puede contener múltiples espacios consecutivos",
              noOnlySpaces: (value) =>
                value.trim().length > 0 ||
              "El campo mensaje no puede estar compuesto solo de espacios en blanco",
            },
          }}
          register={register}
          textarea
          placeholder="Escriba bien la descripcion o si no hay tabla"
          maxLength={500}
          resetCount={resetCount}
          />

<div className="form-group text-center">
  <div className="form-check-inline d-flex justify-content-evenly">
    <div className="mx-3">

    <input
      checked={formData.available}
      className="form-check-input"
      id="available"
      name="available"
      type="checkbox"
      onChange={handleChange}
      />
      </div>
    <label htmlFor="available" className="form-check-label">Disponible</label>
  </div>
</div>

      <div className="form-group py-3">
  
  <select
    className="form-style custom-select"
    id="category"
    name="category"
    value={formData.category}
    onChange={handleChange}
  >
    <option value="" disabled>
          Categoría
        </option>
        <option value="burgers">Burgers</option>
        <option value="entrantes">Entrantes</option>
        <option value="kids">Kids</option>
        <option value="bebidas">Bebidas</option>
        <option value="postres">Postres</option>
      </select>
</div>

      <div className="justify-content-around">
        <button className="rounded-button" type="submit">
          {initialData ? "Actualizar" : "Guardar Producto"}
        </button>
        {initialData && (
          <button className="rounded-button" type="button" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

ProductForm.propTypes = {
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ProductForm;
