import axios from 'axios';

const API_URL = 'http://localhost:8000/api/product/';

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}get-products`);
        console.log("Fetched products:", response.data);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching products', error);
        throw error;
    }
};

export const createProduct = async (productData) => {
    console.log("Creating product:", productData);
    try {
        const response = await axios.post(`${API_URL}add-product`, productData);
        console.log("Product created:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating product', error);
        throw error;
    }
};

export const updateProduct = async (id, productData) => {
    console.log("Updating product with ID:", id, "Data:", productData);
    try {
        const response = await axios.put(`${API_URL}edit-product/${id}`, productData);
        console.log("Product updated:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating product', error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    console.log("Deleting product with ID:", id);
    try {
        await axios.delete(`${API_URL}delete-product/${id}`);
        console.log("Product deleted:", id);
    } catch (error) {
        console.error('Error deleting product', error);
        throw error;
    }
};
