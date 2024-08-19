// import PropTypes from 'prop-types';
// import '../Admin/Admin.css';

// export default function AdminTable({ products, onEdit, onDelete, onView }) {
//   return (
//     <table className="product-table">
//       <thead>
//         <tr>
//           <th>Nombre</th>
//           <th>Descripción</th>
//           <th>Imagen</th>
//           <th>Categoría</th>
//           <th>Disponible</th>
//           <th>Precio</th>
//           <th>Opciones Free</th>
//           <th>Acciones</th>
//         </tr>
//       </thead>
//       <tbody>
//         {products.map((product, index) => (
//           <tr key={index}>
//             <td>{product.titulo}</td>
//             <td>{product.descripcion}</td>
//             <td>
//               <img src={product.imagen} alt={product.titulo} className="product-image" />
//             </td>
//             <td>{product.categorias}</td>
//             <td>{product.disponible === 'si' ? 'Sí' : 'No'}</td>
//             <td>{product.precio}</td>
//             <td>{product.opcionesFree}</td>
//             <td>
//               <button onClick={() => onEdit(index)} className="edit-button">✏️</button>
//               <button onClick={() => onDelete(index)} className="delete-button">🗑️</button>
//               <button onClick={() => onView(product)} className="view-button">👁️</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
  
// };
// AdminTable.propTypes = {
//   products: PropTypes.arrayOf(PropTypes.shape({
//     titulo: PropTypes.string.isRequired,
//     descripcion: PropTypes.string.isRequired,
//     imagen: PropTypes.string.isRequired,
//     categorias: PropTypes.string.isRequired,
//     disponible: PropTypes.oneOf(['si', 'no']).isRequired,
//     precio: PropTypes.number.isRequired,
//     opcionesFree: PropTypes.oneOf(['vegetariano', 'vegano', 'celiaco']).isRequired
//   })).isRequired,
//   onEdit: PropTypes.func.isRequired,
//   onDelete: PropTypes.func.isRequired,
//   onView: PropTypes.func.isRequired
// };
