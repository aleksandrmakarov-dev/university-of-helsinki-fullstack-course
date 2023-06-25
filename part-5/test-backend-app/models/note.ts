import mongoose, { Schema } from 'mongoose';

export interface Note extends mongoose.Document {
  id: string;
  content: string;
  important: boolean;
  user: mongoose.Types.ObjectId;
}

const noteSchema = new Schema<Note>({
  content: {
    type: String,
    minlength: 5,
    required: true,
  },
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model<Note>('Note', noteSchema);
