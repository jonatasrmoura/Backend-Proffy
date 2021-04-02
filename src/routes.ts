// configurações de rota

import express from 'express';

import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';


const routes = express.Router();
const classesControllers = new ClassesController();
const connectionsController = new ConnectionsController();

// testar, fazendo rotas/
routes.get('/classes', classesControllers.index);
routes.post('/classes', classesControllers.create);

// listar as conecções que eu tenho
routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);

export default routes;