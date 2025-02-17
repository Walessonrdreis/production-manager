import { Router } from 'express';
import { ProductionOrderController } from '../controllers/ProductionOrderController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const productionOrderRoutes = Router();
const productionOrderController = new ProductionOrderController();

productionOrderRoutes.use(ensureAuthenticated);

productionOrderRoutes.post('/', productionOrderController.create);
productionOrderRoutes.get('/', productionOrderController.list);
productionOrderRoutes.get('/:id', productionOrderController.show);
productionOrderRoutes.put('/:id', productionOrderController.update);
productionOrderRoutes.patch('/:id/status', productionOrderController.updateStatus);
productionOrderRoutes.delete('/:id', productionOrderController.delete);

export { productionOrderRoutes }; 