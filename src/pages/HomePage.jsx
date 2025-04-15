import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/productService';
import { Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';

const HomePage = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to Our Store</h1>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
              <CardMedia
                component="div"
                height="200"
                sx={{
                  backgroundColor: '#f3f3f3',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#888',
                  fontSize: '2rem',
                }}
              >
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.productTitle} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50">
                    <path
                      d="M12 4C7.03 4 3 7.58 3 11.5C3 13.88 4.17 15.94 6.05 17.25C6.91 17.82 8.09 18.14 9.2 18.14C9.91 18.14 10.6 17.96 11.25 17.66C11.66 17.5 12 17.32 12 17.05C12 16.78 11.66 16.6 11.25 16.44C10.6 16.14 9.91 15.96 9.2 15.96C8.09 15.96 6.91 15.64 6.05 15.07C4.17 13.78 3 11.72 3 11.5C3 7.58 7.03 4 12 4ZM12 2C6.48 2 2 6.48 2 11.5C2 14.74 3.73 17.45 6.76 18.91C7.52 19.32 8.42 19.54 9.25 19.54C9.93 19.54 10.6 19.29 11.09 18.89C11.5 18.49 12 17.96 12 17.38C12 16.8 11.5 16.26 11.09 15.86C10.6 15.46 9.93 15.21 9.25 15.21C8.42 15.21 7.52 15.43 6.76 15.84C3.73 17.3 2 14.74 2 11.5C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 11.5C22 16.52 17.52 20 12 20C6.48 20 2 16.52 2 11.5"
                    />
                  </svg>
                )}
              </CardMedia>
              <CardContent>
                <Typography variant="h6" component="div">
                  {product.productTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="truncate">
                  {product.productDescription}
                </Typography>
                <Typography variant="h6" color="primary" className="mt-2">
                  ${product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomePage;
