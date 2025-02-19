const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticação
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Gera um token JWT para autenticação
 *     tags: [Auth]
 *     description: |
 *       Endpoint para gerar um token JWT que será usado para autenticar outras requisições.
 *       O token gerado deve ser incluído no header Authorization das requisições protegidas.
 *       Formato: Bearer <token>
 *     responses:
 *       200:
 *         description: Token gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Autenticação bem-sucedida"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       500:
 *         description: Erro ao gerar token
 *         content:
 *           application/json:
 *             example:
 *               error: "Erro ao gerar token"
 */
router.post('/login', authController.login);

module.exports = router; 