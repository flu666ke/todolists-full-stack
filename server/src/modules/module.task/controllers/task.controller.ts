import { Request, Response } from 'express';
import BaseController from '../../../core/abstract/base-controller';
import { ModuleTask_TaskService } from '../services/task.service';
import { ErrorResponse } from '../../../core/abstract/error-response';

class TaskController extends BaseController {
  public async createTask(req: Request, res: Response) {
    const task = req.body;
    const { todoListId } = req.params;

    try {
      const result = await ModuleTask_TaskService.createTask(task, todoListId);

      return this.sendSuccessResponse(res, result);
    } catch (e) {
      return this.sendForbidden(res, ErrorResponse.INVALID_INPUT_PARAMS);
    }
  }

  public async getAllTasks(req: Request, res: Response) {
    const { todoListId } = req.params;

    try {
      const result = await ModuleTask_TaskService.getAllTasks(todoListId);

      return this.sendSuccessResponse(res, result);
    } catch (e) {
      return this.sendNotFound(res, ErrorResponse.NOT_FOUND);
    }
  }

  public async updateTask(req: Request, res: Response) {
    const task = req.body;
    const { id } = req.params;

    try {
      const result = await ModuleTask_TaskService.updateTask(id, task);

      return this.sendSuccessResponse(res, result);
    } catch (e) {
      return this.sendNotFound(res, ErrorResponse.NOT_FOUND);
    }
  }

  public async deleteTask(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const result = await ModuleTask_TaskService.deleteTask(id);

      return this.sendSuccessResponse(res, result);
    } catch (e) {
      return this.sendNotFound(res, ErrorResponse.NOT_FOUND);
    }
  }

  public async deleteTasks(req: Request, res: Response) {
    const { todoListId } = req.params;

    try {
      await ModuleTask_TaskService.deleteTasks(todoListId);

      return this.sendSuccessResponse(res);
    } catch (e) {
      return this.sendNotFound(res, ErrorResponse.NOT_FOUND);
    }
  }
}

export const ModuleTask_TaskController = new TaskController();
