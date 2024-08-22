import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postProductFn, putProductFn } from '../../api/products';
import { useProduct } from '../../stores/useProduct';
import Input from '../ui/input/Input';

const AdminForm = () => {
  const {
    register,
    handleSubmit: onSubmitRHF,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const queryClient = useQueryClient();

  const { mutate: postProduct } = useMutation({
    mutationFn: postProductFn,
    onSuccess: () => {
      toast.dismiss();
      toast.success('Producto guardado');
      reset();
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (e) => {
      toast.dismiss();
      toast.error(e.message);
    },
  });

  const { mutate: putProduct } = useMutation({
    mutationFn: putProductFn,
    onSuccess: () => {
      toast.dismiss();
      toast.success('Producto actualizado');
      reset();
      clearProductToEdit();
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (e) => {
      toast.dismiss();
      toast.error(e.message);
    },
  });

  const { productToEdit, clearProductToEdit } = useProduct();

  if (productToEdit) {
    setValue('name', productToEdit.name);
    setValue('imageUrl', productToEdit.imageUrl);
    setValue('description', productToEdit.description);
    setValue('price', productToEdit.price);
    setValue('category', productToEdit.category);
    setValue('available', productToEdit.available);
    setValue('optionsFree', productToEdit.optionsFree);
  }

  const handleSubmit = (data) => {
    toast.loading('Guardando... Aguarde');
    if (productToEdit) putProduct({ productId: productToEdit.id, data });
    else postProduct(data);
  };

  const handleCancelEdit = () => {
    clearProductToEdit();
    reset();
  };

  return (
    <form className='card p-3 bg-light' onSubmit={onSubmitRHF(handleSubmit)}>
      <h1>Cargar Producto</h1>
      <hr />
      {productToEdit && (
        <div className='alert alert-warning'>
          Atención: Estás modificando el producto <b>{productToEdit.name}</b>
        </div>
      )}
      <Input
        className='mb-2'
        error={errors.name}
        label='Nombre'
        name='name'
        options={{
          required: 'Este campo es requerido',
          minLength: {
            value: 2,
            message: 'El nombre debe tener al menos 2 caracteres',
          },
          maxLength: {
            value: 50,
            message: 'El nombre debe tener como mucho 50 caracteres',
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
        type='text'
      />
      <Input
        className='mb-2'
        error={errors.category}
        label='Categoría'
        name='category'
        options={{
          required: 'Este campo es requerido',
        }}
        placeholder='Categoría del producto'
        register={register}
      />
      <div className='form-group'>
        <label>Disponible</label>
        <select
          {...register('available', { required: 'Este campo es requerido' })}
          className='form-control mb-2'
        >
          <option value='true'>Sí</option>
          <option value='false'>No</option>
        </select>
        {errors.available && <p>{errors.available.message}</p>}
      </div>
      <div className='form-group'>
        <label>Opciones Free:</label>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            {...register('optionsFree.vegetarian')}
            value='Vegetariano'
          />
          <label className='form-check-label'>Vegetariano</label>
        </div>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            {...register('optionsFree.vegan')}
            value='Vegano'
          />
          <label className='form-check-label'>Vegano</label>
        </div>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            {...register('optionsFree.glutenFree')}
            value='Sin TACC'
          />
          <label className='form-check-label'>Sin TACC</label>
        </div>
      </div>
      <div className='text-end'>
        {productToEdit && (
          <button className='btn' type='button' onClick={handleCancelEdit}>
            Cancelar edición
          </button>
        )}
        <button className='btn btn-danger' type='submit'>
          Guardar
        </button>
      </div>
    </form>
  );
};

export default AdminForm;
