import { Request, Response } from 'express';
import BaseController from '../../../core/abstract/base-controller';
import { ModuleTodoList_TodoListService } from '../services/todo-list.service';
import { ErrorResponse } from '../../../core/abstract/error-response';

class TodoListController extends BaseController {
 public async createTodoList(req: Request, res: Response) {
  const todoList = req.body;

  try {
   const result = await ModuleTodoList_TodoListService.createTodoList(todoList);

   return this.sendSuccessResponse(res, result);
  } catch (e) {
   return this.sendForbidden(res, ErrorResponse.INVALID_INPUT_PARAMS);
  }
 }

 public async getAllTodoLists(req: Request, res: Response) {
  try {
   const result = await ModuleTodoList_TodoListService.getAllTodoLists();

   return this.sendSuccessResponse(res, result);
  } catch (e) {
   return this.sendNotFound(res, ErrorResponse.NOT_FOUND);
  }
 }

 public async deleteTodoList(req: Request, res: Response) {
  const { id } = req.params;

  try {
   const result = await ModuleTodoList_TodoListService.deleteTodoList(id);

   return this.sendSuccessResponse(res, result);
  } catch (e) {
   return this.sendNotFound(res, ErrorResponse.NOT_FOUND);
  }
 }
}

export const ModuleTodoList_TodoListController = new TodoListController();
