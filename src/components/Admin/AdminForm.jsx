import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import '../../components/Admin/Admin.css';

const AdminForm = ({ onSubmit, productToEdit }) => {
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
    <>
      <h1 id="h1" className='text-center'>
        <hr />Carga de productos
      </h1>
      <hr className='text-white'/>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="admin-form">
        <div className="form-group">
          <label htmlFor="titulo">Producto</label>
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
          <label htmlFor="imagen" className="me-3">Imagen</label>
          <input
            className='text-white'   
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
          <label htmlFor="disponible" className="me-3">Disponible</label>
          <select className='text-white' {...register("disponible", { required: "La disponibilidad es obligatoria" })}>
            <option className="text-white" value="">Selecciona una opción</option>
            <option className="text-white" value="si">Sí</option>
            <option className="text-white" value="no">No</option>
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
                className='ml-2 me-1'      
                type="radio" 
                value="vegetariano" 
                {...register("opcionesFree")} 
              />
              Vegetariano
            </label>
            <label>
              <input 
                className='ml-2 me-1'  
                type="radio" 
                value="vegano" 
                {...register("opcionesFree")} 
              />
              Vegano
            </label>
            <label>
              <input
                className='ml-2 me-1'      
                type="radio" 
                value="celíaco" 
                {...register("opcionesFree")} 
              />
              Celíaco
            </label>
          </div>
          {errors.opcionesFree && <p className="error">{errors.opcionesFree.message}</p>}
        </div>

        <input type="submit" value="Cargar" className="submit-button" />
      </form>
    </>
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

export default AdminForm;
