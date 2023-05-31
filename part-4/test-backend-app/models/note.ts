import mongoose, { Schema } from 'mongoose';

export interface Note {
  id: string;
  content: string;
  important: boolean;
  user?: any;
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

module.exports = mongoose.model('Note', noteSchema);
