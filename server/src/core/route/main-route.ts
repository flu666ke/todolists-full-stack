import { Application } from 'express';

import ModuleTodoList_Routes from '../../modules/module.todo-list/routes/todo-list.routes';
import ModuleTask_Routes from '../../modules/module.task/routes/task.routes';

export default (app: Application) => {
 // Connect all modules routes
 ModuleTodoList_Routes(app);
 ModuleTask_Routes(app);
};
