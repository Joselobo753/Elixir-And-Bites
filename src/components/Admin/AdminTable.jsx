import PropTypes from 'prop-types';
import '../Admin/Admin.css';

const AdminTable = ({ products, onEdit, onDelete, onView }) => {
  if (!Array.isArray(products)) {
    console.error("`products` should be an array");
    return <p>Error: No se puede renderizar la tabla, los productos no están disponibles.</p>;
  }

  // Función para renderizar las filas de la tabla
  const renderRows = () => {
    return products.map((product, index) => (
      <tr key={index}>
        <td>{product.titulo || 'No disponible'}</td>
        <td>
          {product.imagen ? (
            <img src={product.imagen} alt={product.titulo} className="product-image" />
          ) : (
            'No disponible'
          )}
        </td>
        <td>{product.categorias || 'No disponible'}</td>
        <td>{product.disponible === 'si' ? 'Sí' : 'No'}</td>
        <td>{product.precio || 'No disponible'}</td>
        <td>{product.opcionesFree || 'No disponible'}</td>
        <td>
          <button onClick={() => onEdit(index)} className="edit-button">✏️</button>
          <button onClick={() => onDelete(index)} className="delete-button">🗑️</button>
          <button onClick={() => onView(product)} className="view-button">👁️</button>
        </td>
      </tr>
    ));
  };

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Imagen</th>
          <th>Categoría</th>
          <th>Disponible</th>
          <th>Precio</th>
          <th>Opciones Free</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.length === 0 ? (
          <tr>
            <td colSpan="8">No hay productos disponibles</td>
          </tr>
        ) : (
          renderRows()
        )}
      </tbody>
    </table>
  );
};

AdminTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    titulo: PropTypes.string,
    descripcion: PropTypes.string,
    imagen: PropTypes.string,
    categorias: PropTypes.string,
    disponible: PropTypes.oneOf(['si', 'no']),
    precio: PropTypes.number,
    opcionesFree: PropTypes.oneOf(['vegetariano', 'vegano', 'celíaco'])
  })).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired
};

export default AdminTable;
