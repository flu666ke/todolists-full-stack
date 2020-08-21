import { Schema, Document, Model, model } from 'mongoose';

export interface ITaskDocument extends Document {
  todoListId: string;
  text: string;
  date: Date;
}

export const TaskSchema = new Schema(
  {
    todoListId: {
      type: Schema.Types.ObjectId,
      ref: 'todoLists',
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

interface ITaskModel extends Model<ITaskDocument> {}
export const TaskModel: ITaskModel = model<ITaskDocument, ITaskModel>(
  'task',
  TaskSchema,
  'tasks'
);
