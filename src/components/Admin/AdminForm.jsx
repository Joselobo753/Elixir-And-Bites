
import { useForm } from 'react-hook-form';
import '../../components/Admin/Admin.css'; // Asegúrate de importar el archivo CSS

export default function AdminForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
      console.log(data);
      // Aquí podrías hacer algo con los datos, como enviarlos a una API
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="admin-form">
        <div className="form-group">
          <label htmlFor="titulo">Título</label>
          <input 
            type="text" 
            placeholder="Título" 
            {...register("titulo", { required: "El título es obligatorio", maxLength: { value: 80, message: "Máximo 80 caracteres" } })} 
          />
          {errors.titulo && <p className="error">{errors.titulo.message}</p>}
        </div>
  
        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea 
            placeholder="Descripción" 
            {...register("descripcion", { required: "La descripción es obligatoria" })} 
          />
          {errors.descripcion && <p className="error">{errors.descripcion.message}</p>}
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
          <label htmlFor="imagen">Imagen</label>
          <input 
            type="file" 
            {...register("imagen", { required: "La imagen es obligatoria" })} 
          />
          {errors.imagen && <p className="error">{errors.imagen.message}</p>}
        </div>
  
        <div className="form-group">
          <label htmlFor="categorias">Categorías</label>
          <input 
            type="text" 
            placeholder="Categorías" 
            {...register("categorias", { required: "La categoría es obligatoria" })} 
          />
          {errors.categorias && <p className="error">{errors.categorias.message}</p>}
        </div>
  
        <input type="submit" value="Enviar" className="submit-button" />
      </form>
    );
  }