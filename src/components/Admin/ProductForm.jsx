
import { useProduct } from '../../stores/useProduct';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import Input from '../ui/input/Input';
import './style/Admin.css';

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const {
    productToEdit,
    clearProductToEdit,
    addProduct,
    updateProduct,
  } = useProduct();

  useEffect(() => {
    if (productToEdit) {
      setValue('name', productToEdit.name);
      setValue('imageUrl', productToEdit.imageUrl);
      setValue('description', productToEdit.description);
      setValue('price', productToEdit.price);
      setValue('category', productToEdit.category);
      setValue('available', productToEdit.available);
      setValue('optionsFree.vegetarian', productToEdit.optionsFree.vegetarian);
      setValue('optionsFree.vegan', productToEdit.optionsFree.vegan);
      setValue('optionsFree.glutenFree', productToEdit.optionsFree.glutenFree);
    } else {
      reset();
    }
  }, [productToEdit, setValue, reset]);

  const onSubmit = async (data) => {
    const confirmResult = await Swal.fire({
      title: 'Confirmar',
      text: productToEdit
        ? '¿Estás seguro de que quieres editar este producto?'
        : '¿Estás seguro de que quieres cargar este producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar',
    });

    if (confirmResult.isConfirmed) {
      Swal.fire({
        title: 'Guardando...',
        text: 'Aguarde un momento',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        if (productToEdit) {
          await updateProduct({ productId: productToEdit.id, data });
          Swal.fire({
            icon: 'success',
            title: 'Producto actualizado',
            showConfirmButton: false,
            timer: 1500,
          });
          clearProductToEdit();
        } else {
          await addProduct(data);
          Swal.fire({
            icon: 'success',
            title: 'Producto guardado',
            showConfirmButton: false,
            timer: 1500,
          });
        }
        reset();
      } catch (e) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: e.message,
        });
      }
    }
  };

  const handleCancelEdit = async () => {
    const confirmResult = await Swal.fire({
      title: 'Cancelar Edición',
      text: '¿Estás seguro de que quieres cancelar la edición?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No',
    });

    if (confirmResult.isConfirmed) {
      clearProductToEdit();
      reset();
    }
  };
  return (
    <form className='admin-form' onSubmit={handleSubmit(onSubmit)}>
      <h1>{productToEdit ? 'Editar Producto' : 'Cargar Producto'}</h1>
      {productToEdit && (
        <div className='alert alert-warning'>
          Atención: Estás modificando el producto <b>{productToEdit.name}</b>
        </div>
      )}
      <Input
        className='mb-2'
        error={errors.name}
        label='Producto'
        name='name'
        options={{
          required: 'Este campo es requerido',
          minLength: {
            value: 2,
            message: 'El nombre debe tener al menos 2 caracteres',
          },
          maxLength: {
            value: 20,
            message: 'El nombre debe tener como mucho 20 caracteres',
          },
          validate: {
            noExtraSpace: (value) =>
              !/\s{2,}/.test(value) ||
              "El campo nombre no puede contener múltiples espacios consecutivos",
            noOnlySpace: (value) =>
              value.trim().length > 0 ||
              "El campo nombre no puede estar compuesto solo de espacios en blanco",
          },
        }}
        placeholder='Nombre del producto'
        register={register}
      />
      <Input
        className='mb-2'
        error={errors.imageUrl}
        label='Imagen'
        name='imageUrl'
        options={{
          required: 'Este campo es requerido',
          pattern: {
            value: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
            message: 'El enlace ingresado no es válido, debe ser una URL válida',
          },
          validate: {
            noExtraSpace: (value) =>
              !/\s{2,}/.test(value) ||
              "El campo nombre no puede contener múltiples espacios consecutivos",
            noOnlySpace: (value) =>
              value.trim().length > 0 ||
              "El campo nombre no puede estar compuesto solo de espacios en blanco",
          },
        }}
        placeholder='https://imagen.com/producto.jpg'
        register={register}
      />
      <Input
        textarea
        className='mb-3'
        error={errors.description}
        label='Descripción'
        name='description'
        options={{
          required: 'Este campo es requerido',
          minLength: {
            value: 10,
            message: 'La descripción debe tener al menos 10 caracteres',
          },
          maxLength: {
            value: 500,
            message: 'La descripción debe tener como mucho 500 caracteres',
          },
          validate: {
            noExtraSpace: (value) =>
              !/\s{2,}/.test(value) ||
              "El campo nombre no puede contener múltiples espacios consecutivos",
            noOnlySpace: (value) =>
              value.trim().length > 0 ||
              "El campo nombre no puede estar compuesto solo de espacios en blanco",
          },
        }}
        placeholder='Descripción del producto'
        register={register}
      />
      <Input
        className='mb-2'
        error={errors.price}
        label='Precio'
        name='price'
        options={{
          required: 'Este campo es requerido',
          pattern: {
            value: /^\d+(\.\d{1,2})?$/,
            message: 'El precio debe ser un número válido con hasta dos decimales',
          },
        }}
        placeholder='Precio del producto'
        register={register}
        type='number'
      />
      <Input
        className='mb-2'
        error={errors.category}
        label='Categoría'
        name='category'
        options={{
          required: 'Este campo es requerido',
          validate: {
            noExtraSpace: (value) =>
              !/\s{2,}/.test(value) ||
              "El campo nombre no puede contener múltiples espacios consecutivos",
            noOnlySpace: (value) =>
              value.trim().length > 0 ||
              "El campo nombre no puede estar compuesto solo de espacios en blanco",
          },
        }}
        placeholder='Categoría del producto'
        register={register}
      />
      <div className='form-group'>
        <label htmlFor='available'>Disponible</label>
        <select
          id='available'
          {...register('available', { required: 'Este campo es requerido' })}
          className='form-control mb-2'
        >
          <option value='true'>Sí</option>
          <option value='false'>No</option>
        </select>
        {errors.available && <p className='error-message'>{errors.available.message}</p>}
      </div>
      <div className='form-group'>
        <label>Opciones Free:</label>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            id='vegetarian'
            {...register('optionsFree.vegetarian')}
            value='Vegetariano'
          />
          <label className='form-check-label' htmlFor='vegetarian'>
            Vegetariano
          </label>
        </div>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            id='vegan'
            {...register('optionsFree.vegan')}
            value='Vegano'
          />
          <label className='form-check-label' htmlFor='vegan'>
            Vegano
          </label>
        </div>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            id='glutenFree'
            {...register('optionsFree.glutenFree')}
            value='Sin TACC'
          />
          <label className='form-check-label' htmlFor='glutenFree'>
            Sin TACC
          </label>
        </div>
      </div>
      <div className='text-end'>
        {productToEdit && (
          <button className='btn btn-secondary me-2' type='button' onClick={handleCancelEdit}>
            Cancelar Edición
          </button>
        )}
        <button className='btn btn-primary' type='submit'>
          {productToEdit ? 'Actualizar' : 'Cargar'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
