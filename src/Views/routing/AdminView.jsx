import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";  // Importa useForm aquí
import { getProductsFn, createProduct, updateProduct, deleteProduct } from '../../api/products.js';
import ProductForm from '../../components/Admin/ProductForm';
import ProductTable from '../../components/Admin/ProductTable';
import { useSession } from '../../constans/Stores/useSesion.js';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import Loading from '../../components/common/Loading/Loading.jsx';

const AdminView = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoggedIn } = useSession();

  // Mover useForm aquí
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm({
  
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await getProductsFn();
        const fetchedProducts = response.data || [];
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async (product) => {
    try {
      const newProduct = await createProduct(product);
      setProducts([...products, newProduct]);
      document.querySelector('.table-responsive').scrollIntoView({ behavior: 'smooth' });
      toast.success('Se agrego el producto correctamente');
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      toast.error('Error al cargar el producto');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    reset(product);  // Aquí reseteas el formulario con los datos del producto seleccionado
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const updated = await updateProduct(updatedProduct.id, updatedProduct);
      if (updated) {
        setProducts(
          products.map((product) =>
            product.id === updatedProduct.id ? updated : product
          )
        );
        setEditingProduct(null);
        reset();  
        toast.success('Se actulizo el producto correctamente');
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      toast.error("Error al actualizar el producto");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter((product) => product.id !== productId));
      toast.success('Se elimino el producto correctamente');
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      toast.error('Error al eliminar');
    }
  };

  if (!isLoggedIn || !user) {
    return <Navigate to="/" />;
  }

  if (user.isAdmin) {
    return (
      <div className="py-4 text-center">
        <h2 className='title-enfasis'>Administrador de Productos</h2>
        <div className='px-2'>
          <ProductForm
            initialData={editingProduct}
            onCancel={() => setEditingProduct(null)}
            onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
            register={register}  // Pasamos register como prop
            handleSubmit={handleSubmit}  // Pasamos handleSubmit como prop
            reset={reset}  // Pasamos reset como prop
            errors={errors}  // Pasamos errors como prop
            watch={watch}  // Pasamos watch como prop
          />
        </div>
        <div className='py-4'>
          <h3 className='title-enfasis'>Lista de productos</h3>
          {isLoading ? (  
            <>
            <div className='d-flex justify-content-center align-items-center vh-100'>
              <Loading/>
              <p>Cargando productos...</p>
            </div>
            </>
          ) : (
            <ProductTable
              products={products}
              onDelete={handleDeleteProduct}
              onEdit={handleEditProduct}
            />
          )}
        </div>
      </div>
    );
  }
}

export default AdminView;