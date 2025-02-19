const request = require('supertest');
const express = require('express');
const productRoutes = require('../routes/productRoutes');
const Product = require('../models/Product');
const sequelize = require('../config/database');

const app = express();
app.use(express.json());
app.use('/api/products', productRoutes);

jest.mock('../middleware/authMiddleware', () => (req, res, next) => next());

describe('Product Controller Tests', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    await Product.destroy({ where: {} });
  });

  describe('POST /api/products', () => {
    it('should create a new product', async () => {
      const productData = {
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        stock: 10
      };

      const response = await request(app)
        .post('/api/products')
        .send(productData);

      expect(response.status).toBe(201);
      expect(response.body.name).toBe(productData.name);
    });
  });

  describe('GET /api/products', () => {
    it('should return all products', async () => {
      await Product.create({
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        stock: 10
      });

      const response = await request(app).get('/api/products');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
    });
  });

  describe('GET /api/products/:id', () => {
    it('should return a product by id', async () => {
      const product = await Product.create({
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        stock: 10
      });

      const response = await request(app).get(`/api/products/${product.id}`);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe(product.name);
    });

    it('should return 404 if product not found', async () => {
      const response = await request(app).get('/api/products/999');
      expect(response.status).toBe(404);
    });
  });
}); 