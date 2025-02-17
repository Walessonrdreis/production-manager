import { Router } from 'express';
import { MaterialController } from '../controllers/MaterialController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const materialRoutes = Router();
const materialController = new MaterialController();

materialRoutes.use(ensureAuthenticated);

materialRoutes.post('/', materialController.create);
materialRoutes.get('/', materialController.list);
materialRoutes.get('/:id', materialController.show);
materialRoutes.put('/:id', materialController.update);
materialRoutes.delete('/:id', materialController.delete);

export { materialRoutes }; 