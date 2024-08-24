const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const postProductFn = async (data) => {
  try {
    const res = await fetch(`${BACKEND_URL}/products`, 
      {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error('Error al enviar los datos');
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Hubo un varios problemas con la solicitud', error);
    throw error;
  }
};

export const putProductFn = async ({ productId, data }) => {

  const res = await fetch(`${BACKEND_URL}/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Error al actualizar los datos del producto');
  }

  const result = await res.json();
  return result;
};

export const getProductsFn = async () => {
  const res = await fetch(`${BACKEND_URL}/products`);
  
  if (!res.ok) {
    throw new Error('Ocurrió un error leyendo los datos de productos');
  }

  const data = await res.json();
  return data;
};

export const getProductFn = async (productId) => {
  const res = await fetch(`${BACKEND_URL}/products/${productId}`);
  
  if (!res.ok) {
    throw new Error('Ocurrió un error leyendo el producto seleccionado');
  }

  const data = await res.json();
  return data;
};

export const deleteProductFn = async (productId) => {

  const res = await fetch(`${BACKEND_URL}/products/${productId}`, {
    method: 'DELETE',
    headers: {
    },
  });

  if (!res.ok) {
    throw new Error('Error al eliminar el producto');
  }

  return { message: 'Producto eliminado con éxito' };
};

export const fetchProductsFn = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/products/`, {
    method: 'DELETE',
    headers: {
    },
  });
    
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new Error('Los datos recibidos no son una lista de productos válida');
    }
    
    return data;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
};
