const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID único do produto
 *         name:
 *           type: string
 *           description: Nome do produto
 *         description:
 *           type: string
 *           description: Descrição detalhada do produto
 *         price:
 *           type: number
 *           format: float
 *           description: Preço do produto
 *         stock:
 *           type: integer
 *           description: Quantidade em estoque
 *         category:
 *           type: string
 *           description: Categoria do produto
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *           description: Status do produto
 *       example:
 *         name: "Smartphone XYZ"
 *         description: "Smartphone último modelo com 256GB"
 *         price: 2499.99
 *         stock: 50
 *         category: "Eletrônicos"
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *             example:
 *               - id: "123e4567-e89b-12d3-a456-426614174000"
 *                 name: "Smartphone XYZ"
 *                 description: "Smartphone último modelo com 256GB"
 *                 price: 2499.99
 *                 stock: 50
 *                 category: "Eletrônicos"
 *                 status: "active"
 *               - id: "987fcdeb-51a2-43f7-9135-7842e1c53f01"
 *                 name: "Notebook ABC"
 *                 description: "Notebook com processador i7"
 *                 price: 4999.99
 *                 stock: 20
 *                 category: "Eletrônicos"
 *                 status: "active"
 */
router.get('/', productController.getAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtém um produto pelo ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Produto encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto não encontrado
 *         content:
 *           application/json:
 *             example:
 *               error: "Produto não encontrado"
 */
router.get('/:id', productController.getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *           example:
 *             name: "Smart TV 4K"
 *             description: "Smart TV 55 polegadas 4K HDR"
 *             price: 3299.99
 *             stock: 30
 *             category: "Eletrônicos"
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             example:
 *               error: "Token de autenticação não fornecido"
 */
router.post('/', authMiddleware, productController.createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *           example:
 *             name: "Smart TV 4K Atualizada"
 *             description: "Smart TV 55 polegadas 4K HDR com Alexa"
 *             price: 3499.99
 *             stock: 25
 *             category: "Eletrônicos Premium"
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto não encontrado
 */
router.put('/:id', authMiddleware, productController.updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Remove um produto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       204:
 *         description: Produto removido com sucesso
 *       404:
 *         description: Produto não encontrado
 *         content:
 *           application/json:
 *             example:
 *               error: "Produto não encontrado"
 */
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router; 