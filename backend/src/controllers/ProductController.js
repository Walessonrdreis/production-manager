const Product = require('../models/Product');

class ProductController {
  // Listar todos os produtos
  async index(req, res) {
    try {
      const products = await Product.findAll();
      return res.json(products.map(product => ({
        ...product.toJSON(),
        price: parseFloat(product.price)
      })));
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      return res.status(500).json({ 
        error: 'Erro ao listar produtos',
        details: error.message 
      });
    }
  }

  // Buscar um produto específico
  async show(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      const productData = product.toJSON();
      productData.price = parseFloat(productData.price);

      return res.json(productData);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      return res.status(500).json({ 
        error: 'Erro ao buscar produto',
        details: error.message 
      });
    }
  }

  // Criar um novo produto
  async create(req, res) {
    try {
      const { name, description, price, stock, category } = req.body;

      // Validar e converter o preço
      const validPrice = parseFloat(price);
      if (isNaN(validPrice)) {
        return res.status(400).json({ 
          error: 'Preço inválido',
          details: 'O preço deve ser um número válido'
        });
      }

      const product = await Product.create({
        name,
        description,
        price: validPrice,
        stock: parseInt(stock, 10),
        category
      });

      const productData = product.toJSON();
      productData.price = parseFloat(productData.price);

      return res.status(201).json(productData);
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ 
          error: 'Dados inválidos',
          details: error.errors.map(err => ({
            field: err.path,
            message: err.message
          }))
        });
      }

      return res.status(500).json({ 
        error: 'Erro ao criar produto',
        details: error.message 
      });
    }
  }

  // Atualizar um produto
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price, stock, category, status } = req.body;

      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      // Validar e converter o preço se fornecido
      let updateData = { name, description, category, status };
      if (price !== undefined) {
        const validPrice = parseFloat(price);
        if (isNaN(validPrice)) {
          return res.status(400).json({ 
            error: 'Preço inválido',
            details: 'O preço deve ser um número válido'
          });
        }
        updateData.price = validPrice;
      }
      if (stock !== undefined) {
        updateData.stock = parseInt(stock, 10);
      }

      await product.update(updateData);

      const updatedProduct = await Product.findByPk(id);
      const productData = updatedProduct.toJSON();
      productData.price = parseFloat(productData.price);

      return res.json(productData);
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ 
          error: 'Dados inválidos',
          details: error.errors.map(err => ({
            field: err.path,
            message: err.message
          }))
        });
      }

      return res.status(500).json({ 
        error: 'Erro ao atualizar produto',
        details: error.message 
      });
    }
  }

  // Deletar um produto
  async delete(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      await product.destroy();
      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      return res.status(500).json({ 
        error: 'Erro ao deletar produto',
        details: error.message 
      });
    }
  }

  // Atualizar estoque
  async updateStock(req, res) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      const newStock = product.stock + parseInt(quantity, 10);
      if (newStock < 0) {
        return res.status(400).json({ error: 'Estoque insuficiente' });
      }

      await product.update({
        stock: newStock
      });

      const updatedProduct = await Product.findByPk(id);
      const productData = updatedProduct.toJSON();
      productData.price = parseFloat(productData.price);

      return res.json(productData);
    } catch (error) {
      console.error('Erro ao atualizar estoque:', error);
      return res.status(500).json({ 
        error: 'Erro ao atualizar estoque',
        details: error.message 
      });
    }
  }
}

module.exports = new ProductController(); 