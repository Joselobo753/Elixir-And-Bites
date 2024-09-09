import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import "./Admin.css";

const ProductTable = ({ products, onEdit, onDelete, onReload }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const handleReload = () => {
    onReload(); // Llama a la función que actualiza los productos
  };

  const handleView = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleEdit = (product) => {
    onEdit(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (productId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar',
      customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(productId);
        Swal.fire(
          '¡Eliminado!',
          'El producto ha sido eliminado.',
          'success'
        );
      }
    });
  };

  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="table-responsive container">
      <table className=" table-custom">
        <thead>
          <tr>
            <th>#</th>
            <th className="d-none d-lg-table-cell ">imagen</th>
            <th>Nombre</th>
            <th className="d-none d-lg-table-cell ">Descripción</th> {/* Nueva columna "Descripción" */}
            <th>Precio</th>
            <th>Disponible</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
  {currentProducts.length > 0 ? (
    currentProducts.map((product, index) => (
      product ? ( // Verificación adicional para asegurarse de que el producto no sea null
        <tr key={product.id}>
          <td>{indexOfFirstProduct + index + 1}</td>
          <td className="d-none d-lg-table-cell">
            {product.imageUrl ? ( // Verificación de imageUrl antes de usarlo
              <img src={product.imageUrl} alt="Imagen" className="imgTable" />
            ) : (
              <span>Imagen no disponible</span>
            )}
          </td>
          <td>{product.name}</td>
          <td className="d-none d-lg-table-cell text-start">
            {product.description}
          </td>
          <td>${product.price}</td>
          <td>{product.available ? "Sí" : "No"}</td>
          <td className="d-flex">
            <button
              className="btn btn-danger mx-1"
              onClick={() => handleDelete(product.id)}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
            <button
              className="btn btn-warning mx-1"
              onClick={() => handleEdit(product)}
            >
              <i className="fas fa-edit"></i>
            </button>
            <button
              className="btn btn-info mx-1 d-lg-none"
              onClick={() => handleView(product)}
            >
              <i className="fas fa-eye"></i>
            </button>
          </td>
        </tr>
      ) : (
        <tr key={index}>
          <td colSpan="7">Producto no disponible</td>
        </tr>
      )
    ))
  ) : (
    <tr>
      <td colSpan="7">No hay productos disponibles</td>
    </tr>
  )}
</tbody>
      </table>


     
      {products.length > productsPerPage && (
        <nav className="mt-3">
          <ul className="pagination justify-content-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index + 1} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {selectedProduct && (
        <Modal show={true} onHide={handleCloseModal} className="custom-modal">
          <Modal.Header closeButton className="custom-modal-header">
            <Modal.Title className="custom-modal-title">{selectedProduct.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="custom-modal-body">
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.name}
              className="mb-3 custom-modal-image"
            />
            <p><strong>Descripción:</strong> {selectedProduct.description}</p>
            <p><strong>Precio:</strong> ${selectedProduct.price}</p>
            <p>
              <strong>Disponible:</strong>{" "}
              {selectedProduct.available ? "Sí" : "No"}
            </p>
            <p><strong>Categoría:</strong> {selectedProduct.category}</p>
          </Modal.Body>
          <Modal.Footer className="custom-modal-footer">
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

ProductTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // Cambiado de _id a id para coincidir con el código
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      available: PropTypes.bool.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onReload: PropTypes.func
};

export default ProductTable;