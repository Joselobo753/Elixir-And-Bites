
import { useForm } from 'react-hook-form';

import '../Admin/Admin.css';
import { useState } from 'react';

export default function AdminForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [products, setProducts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const onSubmit = data => {
    if (editingIndex !== null) {
      const updatedProducts = products.map((product, index) =>
        index === editingIndex ? data : product
      );
      setProducts(updatedProducts);
      setEditingIndex(null);
    } else {
      setProducts([...products, data]);
    }
    reset();
  };

  const handleEdit = index => {
    setEditingIndex(index);
    reset(products[index]);
  };

  const handleDelete = index => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleView = product => {
    alert(`Detalles del producto:\n\nNombre: ${product.titulo}\nDescripción: ${product.descripcion}\nPrecio: ${product.precio}\nCategorías: ${product.categorias}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="admin-form">
        {/* Campos del formulario */}
        <div className="form-group">
          <label htmlFor="titulo">Título</label>
          <input 
            type="text" 
            placeholder="Título" 
            {...register("titulo", { required: "El título es obligatorio", maxLength: { value: 80, message: "Máximo 80 caracteres" } })} 
          />
          {errors.titulo && <p className="error">{errors.titulo.message}</p>}
        </div>
        
        {/* Resto de los campos */}
        
        <input type="submit" value="Enviar" className="submit-button" />
      </form>

      {/* Renderizar la tabla de productos */}
      <table className="product-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Disponible</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.titulo}</td>
              <td>{product.precio}</td>
              <td>{product.disponible ? 'Sí' : 'No'}</td>
              <td>
                <button onClick={() => handleEdit(index)} className="edit-button">✏️</button>
                <button onClick={() => handleDelete(index)} className="delete-button">🗑️</button>
                <button onClick={() => handleView(product)} className="view-button">👁️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
