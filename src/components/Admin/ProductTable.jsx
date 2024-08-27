import PropTypes from "prop-types";
import "./Admin.css";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";


const ProductTable = ({ products, onEdit, onDelete }) => {
 
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  return (
    <div className="py-3 admin-list container">
      <table className="table-responsive table-dark table-bordered text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Disponible</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
  {Array.isArray(products) && products.length > 0 ? (
    products.map((product, index) => (
      product ? (
        <tr key={product._id} >
          <td>{index + 1}</td>
          <td>{product.name}</td>
          <td>${product.price}</td>
          <td>{product.available ? "Sí" : "No"}</td>
          <td className="d-flex">
            <button
              className="btn btn-danger mx-1"
              onClick={() => handleDelete(product._id)}
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
              className="btn btn-info mx-1"
              onClick={() => handleView(product)}
            >
              <i className="fas fa-eye"></i>
            </button>
          </td>
        </tr>
      ) : null
    ))
  ) : (
    <tr>
      <td colSpan="5">No hay productos disponibles</td>
    </tr>
  )}
</tbody>

      </table>

      {selectedProduct && (
  <Modal show={true} onHide={handleCloseModal} className="custom-modal">
    <Modal.Header closeButton className="custom-modal-header">
      <Modal.Title className="custom-modal-title">{selectedProduct.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body className="custom-modal-body">
      <img
        src={selectedProduct.imageUrl}
        alt={selectedProduct.name}
        className="img-fluid mb-3 custom-modal-image"
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
      _id: PropTypes.string.isRequired,
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
};

export default ProductTable;
