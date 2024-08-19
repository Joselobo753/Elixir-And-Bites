import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import '../../components/Admin/Admin.css'; // Asegúrate de importar el archivo CSS

export default function AdminForm({ onSubmit, productToEdit }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (productToEdit) {
      reset(productToEdit);
    }
  }, [productToEdit, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="admin-form">
      <div className="form-group">
        <label htmlFor="titulo">Título Carga de Productos</label>
        <input 
          type="text" 
          placeholder="Nombre del Producto" 
          {...register("titulo", { required: "El título es obligatorio", maxLength: { value: 20, message: "Máximo 20 caracteres" } })} 
        />
        {errors.titulo && <p className="error">{errors.titulo.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="descripcion">Descripción del Producto</label>
        <textarea 
          placeholder="Descripción" 
          {...register("descripcion", { required: "La descripción es obligatoria" })} 
        />
        {errors.descripcion && <p className="error">{errors.descripcion.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="imagen">Imagen</label>
        <input 
          type="url" 
          placeholder="URL de la Imagen" 
          {...register("imagen", { required: "La imagen es obligatoria" })} 
        />
        {errors.imagen && <p className="error">{errors.imagen.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="categorias">Categoría</label>
        <input 
          type="text" 
          placeholder="Categoría" 
          {...register("categorias", { required: "La categoría es obligatoria" })} 
        />
        {errors.categorias && <p className="error">{errors.categorias.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="disponible">Disponible</label>
        <select {...register("disponible", { required: "La disponibilidad es obligatoria" })}>
          <option className = "text-white" value="">Selecciona una opción</option>
          <option className = "text-white"value="si">Sí</option>
          <option className = "text-white" value="no">No</option>
        </select>
        {errors.disponible && <p className="error">{errors.disponible.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="precio">Precio</label>
        <input 
          type="number" 
          placeholder="Precio" 
          {...register("precio", { 
            required: "El precio es obligatorio", 
            min: { value: 1, message: "El precio debe ser mayor que 0" }
          })} 
        />
        {errors.precio && <p className="error">{errors.precio.message}</p>}
      </div>

      <div className="form-group">
        <label>Opciones Free</label>
        <div>
          <label>
            <input 
              type="radio" 
              value="vegetariano" 
              {...register("opcionesFree", { required: "Debes seleccionar una opción" })} 
            />
            Vegetariano
          </label>
          <label>
            <input 
              type="radio" 
              value="vegano" 
              {...register("opcionesFree")} 
            />
            Vegano
          </label>
          <label>
            <input 
              type="radio" 
              value="celíaco" 
              {...register("opcionesFree")} 
            />
            Celíaco
          </label>
        </div>
        {errors.opcionesFree && <p className="error">{errors.opcionesFree.message}</p>}
      </div>

      <input type="submit" value="Enviar" className="submit-button" />
    </form>
  );
};
AdminForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  productToEdit: PropTypes.shape({
    titulo: PropTypes.string,
    descripcion: PropTypes.string,
    imagen: PropTypes.string,
    categorias: PropTypes.string,
    disponible: PropTypes.string,
    precio: PropTypes.number,
    opcionesFree: PropTypes.string
  })
};
