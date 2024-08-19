import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import Input from '../ui/input/Input';
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
      <h1 id="h1" className='text-center'><hr />Carga de productos</h1>
      <hr className='text-white'/>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="admin-form">
        <Input
          name="titulo"
          label="Producto"
          placeholder="Nombre del Producto"
          register={register}
          options={{ required: "El título es obligatorio", maxLength: { value: 20, message: "Máximo 20 caracteres" } }}
          error={errors.titulo}
        />
        
        <Input
          name="descripcion"
          label="Descripción del Producto"
          placeholder="Descripción"
          textarea
          register={register}
          options={{ required: "La descripción es obligatoria" }}
          error={errors.descripcion}
        />

        <Input
          name="imagen"
          label="Imagen"
          placeholder="URL de la Imagen"
          type="url"
          register={register}
          options={{ required: "La imagen es obligatoria" }}
          error={errors.imagen}
        />

        <Input
          name="categorias"
          label="Categoría"
          placeholder="Categoría"
          register={register}
          options={{ required: "La categoría es obligatoria" }}
          error={errors.categorias}
        />

        <Input
          name="disponible"
          label="Disponible"
          select
          selectOptions={[
            { value: '', label: 'Selecciona una opción' },
            { value: 'si', label: 'Sí' },
            { value: 'no', label: 'No' },
          ]}
          register={register}
          options={{ required: "La disponibilidad es obligatoria" }}
          error={errors.disponible}
        />

        <Input
          name="precio"
          label="Precio"
          type="number"
          placeholder="Precio"
          register={register}
          options={{ required: "El precio es obligatorio", min: { value: 1, message: "El precio debe ser mayor que 0" } }}
          error={errors.precio}
        />

        <Input
          name="opcionesFree"
          label="Opciones Free"
          select
          selectOptions={[
            { value: 'vegetariano', label: 'Vegetariano' },
            { value: 'vegano', label: 'Vegano' },
            { value: 'celíaco', label: 'Celíaco' },
          ]}
          register={register}
          options={{ required: "Debes seleccionar una opción" }}
          error={errors.opcionesFree}
        />

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
