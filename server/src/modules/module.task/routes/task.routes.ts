import { Application } from 'express';
import { ModuleTask_TaskController } from '../controllers/task.controller';

export default (app: Application) => {
 app.post('/task/:todoListId', (req, res, next) =>
  ModuleTask_TaskController.createTask(req, res)
 );

 app.get('/tasks/:todoListId', (req, res, next) =>
  ModuleTask_TaskController.getAllTasks(req, res)
 );

 app.put('/task/:id', (req, res, next) =>
  ModuleTask_TaskController.updateTask(req, res)
 );

 app.delete('/task/:id', (req, res, next) =>
  ModuleTask_TaskController.deleteTask(req, res)
 );

 app.delete('/tasks/:todoListId', (req, res, next) =>
  ModuleTask_TaskController.deleteTasks(req, res)
 );
};
