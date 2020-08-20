import { Schema, Document, Model, model } from 'mongoose';

export interface ITodoListDocument extends Document {
 listName: string;
}

export const TodoListSchema = new Schema(
 {
  listName: {
   type: String,
   required: true,
   trim: true,
  },
 },
 { timestamps: true }
);

interface ITodoListModel extends Model<ITodoListDocument> {}
export const TodoListModel: ITodoListModel = model<
 ITodoListDocument,
 ITodoListModel
>('todolist', TodoListSchema, 'todolists');
