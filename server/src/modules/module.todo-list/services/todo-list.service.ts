import {
  ITodoListDocument,
  TodoListModel,
} from '../data-models/todo-list.model';

class TodoListService {
  public async createTodoList(todoList: ITodoListDocument) {
    const newlist: ITodoListDocument = new TodoListModel(todoList);

    return await newlist.save();
  }

  public async getAllTodoLists(): Promise<ITodoListDocument[]> {
    const alltodos = await TodoListModel.find();

    return alltodos;
  }

  public async deleteTodoList(id: string) {
    const deletedTodoList = await TodoListModel.findByIdAndDelete(id);

    return deletedTodoList;
  }
}

export const ModuleTodoList_TodoListService: TodoListService = new TodoListService();
