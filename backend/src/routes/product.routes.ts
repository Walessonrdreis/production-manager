import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const productRoutes = Router();
const productController = new ProductController();

productRoutes.use(ensureAuthenticated);

productRoutes.post('/', productController.create);
productRoutes.get('/', productController.list);
productRoutes.get('/:id', productController.show);
productRoutes.put('/:id', productController.update);
productRoutes.delete('/:id', productController.delete);

export { productRoutes }; 