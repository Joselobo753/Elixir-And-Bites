import { create } from 'zustand';
import { postProductFn, putProductFn, deleteProductFn, fetchProductsFn } from '../api/products';

export const useProduct = create((set) => ({
  products: [],
  productToEdit: null,

  setProductToEdit: (product) => set({ productToEdit: product }),
  clearProductToEdit: () => set({ productToEdit: null }),

  addProduct: async (data) => {
    try {
      const newProduct = await postProductFn(data);
      set((state) => ({
        products: [...state.products, newProduct],
      }));
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  updateProduct: async ({ productId, data }) => {
    try {
      const updatedProduct = await putProductFn({ productId, data });
      set((state) => ({
        products: state.products.map((product) =>
          product.id === productId ? updatedProduct : product
        ),
      }));
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  deleteProduct: async (productId) => {
    try {
      await deleteProductFn(productId);
      set((state) => ({
        products: state.products.filter((product) => product.id !== productId),
      }));
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  fetchProducts: async () => {
    try {
      const products = await fetchProductsFn();
      set({ products });
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
}));
