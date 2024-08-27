import { useState, useEffect } from 'react';
import { getProductsFn, createProduct, updateProduct, deleteProduct } from '../../api/products.js';

import ProductForm from '../../components/Admin/ProductForm'
import ProductTable from '../../components/Admin/ProductTable'

const AdminView = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductsFn();
        const fetchedProducts = response.data || []; 
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };
    fetchProducts();
  }, []);


  const handleAddProduct = async (product) => {
    try {
      const newProduct = await createProduct(product);
      setProducts([...products, newProduct]);
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
  };


  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async (updatedProduct) => {
 
    const { id, ...dataProduct } = updatedProduct;
    try {
      const updated = await updateProduct(editingProduct.id, dataProduct);

      console.log(updateProduct);
      if (updated) {
        setProducts(
          products.map((product) =>
            product.id === editingProduct.id ? updated : product
          )
        );
        setEditingProduct(null);
      } else {
        console.error(
          "El producto actualizado es nulo o no se devolvió correctamente"
        );
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };


  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div className="py-4 text-center">
      <h2 className='title-enfasis'>Administrador de Productos</h2>
      <div className='px-2'>

      <ProductForm
        initialData={editingProduct}
        onCancel={() => setEditingProduct(null)}
        onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
        />
        </div>
      <ProductTable
        products={products}
        onDelete={handleDeleteProduct}
        onEdit={handleEditProduct}
      />
    </div>
  );
};

export default AdminView;