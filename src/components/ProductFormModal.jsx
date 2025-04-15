import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const ProductFormModal = ({ isOpen, onClose, onSave, product }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    quantity: '',
    image: null,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.productTitle,
        price: product.price,
        description: product.productDescription,
        quantity: product.quantity,
        image: product.image || null,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      productTitle: formData.name,  
      productDescription: formData.description,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity, 10),
      image: formData.image,
    };

    if (isNaN(productData.price) || isNaN(productData.quantity)) {
      alert('Please enter valid numbers for price and quantity.');
      return;
    }

    onSave(productData);
    setFormData({ name: '', price: '', description: '', quantity: '', image: null });
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{product ? 'Update Product' : 'Add New Product'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Product Title"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <div style={{ display: 'flex', gap: '16px' }}>
          <TextField
            label="Quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            type="number"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            type="number"
            fullWidth
            margin="normal"
          />
        </div>
        <div style={{ marginTop: '16px' }}>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            style={{ width: '100%' }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="default">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductFormModal;
