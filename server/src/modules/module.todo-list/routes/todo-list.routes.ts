import { Application } from 'express';
import { ModuleTodoList_TodoListController } from '../controllers/todo-list.controller';

export default (app: Application) => {
 app.post('/todo-list', (req, res, next) =>
  ModuleTodoList_TodoListController.createTodoList(req, res)
 );

 app.get('/todo-list', (req, res, next) =>
  ModuleTodoList_TodoListController.getAllTodoLists(req, res)
 );
 app.delete('/todo-list/:id', (req, res, next) =>
  ModuleTodoList_TodoListController.deleteTodoList(req, res)
 );
};
