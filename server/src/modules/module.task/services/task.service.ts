import { ITaskDocument, TaskModel } from '../data-models/task.model';

class TaskService {
  public async createTask(
    task: ITaskDocument,
    todoListId: string
  ): Promise<ITaskDocument> {
    const { text, date } = task;

    const newTask: ITaskDocument = new TaskModel({
      text,
      date,
      todoListId,
    });

    return await newTask.save();
  }

  public async getAllTasks(todoListId: string): Promise<ITaskDocument[]> {
    const allTasks = await TaskModel.find({ todoListId });

    return allTasks;
  }

  public async updateTask(id: string, task: ITaskDocument) {
    const { text, date } = task;
    await TaskModel.updateOne({ _id: id }, { text, date });

    return await TaskModel.findById(id);
  }

  public async deleteTask(id: string) {
    const deleteDtask = await TaskModel.findByIdAndDelete(id);

    return deleteDtask;
  }

  public async deleteTasks(todoListId: string) {
    await TaskModel.deleteMany({ todoListId });
  }
}

export const ModuleTask_TaskService: TaskService = new TaskService();
