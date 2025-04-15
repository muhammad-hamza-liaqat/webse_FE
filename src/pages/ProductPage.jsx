import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';
import ProductTable from '../components/ProductTable';
import ProductFormModal from '../components/ProductFormModal';
import { Button } from '@mui/material';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleAddProduct = () => {
        setSelectedProduct(null); 
        setIsModalOpen(true);
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleDeleteProduct = async (id) => {
        try {
            await deleteProduct(id);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleSaveProduct = async (productData) => {
        try {
            if (selectedProduct) {
                await updateProduct(selectedProduct._id, productData);
            } else {
                await createProduct(productData);
            }
            setIsModalOpen(false);
            fetchProducts();
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    return (
        <div style={{ padding: '16px' }}>
            <h1>Product Management</h1>
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddProduct}
                style={{ marginBottom: '16px' }}
            >
                Add Product
            </Button>
            <ProductTable
                products={products}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
            />
            <ProductFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveProduct}
                product={selectedProduct}
            />
        </div>
    );
};

export default ProductPage;
