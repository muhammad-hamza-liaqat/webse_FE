import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 400, marginTop: 2 }}>
      <Table stickyHeader aria-label="product table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow hover role="checkbox" key={product._id}>
              <TableCell>{product._id}</TableCell>
              <TableCell>{product.productTitle}</TableCell>
              <TableCell>{product.productDescription}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => onEdit(product)} sx={{ marginRight: 1 }}>
                  Edit
                </Button>
                <Button variant="contained" color="secondary" onClick={() => onDelete(product._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
