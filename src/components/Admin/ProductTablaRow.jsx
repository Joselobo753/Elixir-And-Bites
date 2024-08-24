import { useState } from 'react';
import AdminForm from '../Admin/AdminForm.jsx';
import AdminTable from '../Admin/AdminTable.jsx';

const AdminTablaRow = () => {
  const [products, setProducts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddProduct = (data) => {
    if (editingIndex !== null) {
      // Actualiza el producto existente en la lista
      const updatedProducts = products.map((product, index) =>
        index === editingIndex ? data : product
      );
      setProducts(updatedProducts);
      setEditingIndex(null); // Termina el estado de edición
    } else {
      // Agrega un nuevo producto a la lista
      setProducts([...products, data]);
    }
  };

  const handleEditProduct = (index) => {
    // Establece el índice del producto a editar y carga los datos en el formulario
    setEditingIndex(index);
  };

  const handleDeleteProduct = (index) => {
    // Elimina el producto de la lista
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleViewProduct = (product) => {
    // Muestra una alerta con los detalles del producto
    alert(`Detalles del producto:\n\nNombre: ${product.titulo}\nDescripción: ${product.descripcion}\nImagen: ${product.imagen}\nCategoría: ${product.categorias}\nDisponible: ${product.disponible}\nPrecio: ${product.precio}\nOpciones Free: ${product.opcionesFree}`);
  };

  return (
    <div>
      <AdminForm 
        onSubmit={handleAddProduct} 
        productToEdit={editingIndex !== null ? products[editingIndex] : null} 
      />
      <AdminTable 
        products={products} 
        onEdit={handleEditProduct} 
        onDelete={handleDeleteProduct} 
        onView={handleViewProduct} 
      />
    </div>
  );
};

export default AdminTablaRow;
