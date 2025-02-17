import { Router } from 'express';
import { userRoutes } from './user.routes';
import { productRoutes } from './product.routes';
import { materialRoutes } from './material.routes';
import { productionOrderRoutes } from './productionOrder.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/products', productRoutes);
routes.use('/materials', materialRoutes);
routes.use('/production-orders', productionOrderRoutes);

export { routes }; 