const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const postProductFn = async (data) => {
  try {
    const res = await fetch(`${BACKEND_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error('Error al enviar los datos del producto');
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Hubo un problema con la solicitud', error);
    throw error;
  }
};

export const putProductFn = async ({ productId, data }) => {
  try {
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
  } catch (error) {
    console.error('Hubo un problema con la solicitud', error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/products`);

    if (!res.ok) {
      throw new Error('Ocurrió un error leyendo los datos de productos');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Hubo un problema con la solicitud', error);
    throw error;
  }
};

export const deleteProductFn = async (productId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/products/${productId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error('Error al eliminar el producto');
    }

    return { message: 'Producto eliminado con éxito' };
  } catch (error) {
    console.error('Hubo un problema con la solicitud', error);
    throw error;
  }
};
