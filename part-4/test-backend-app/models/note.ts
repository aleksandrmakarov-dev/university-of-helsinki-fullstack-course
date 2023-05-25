import mongoose, { Schema } from 'mongoose';

export interface INote {
  id: string;
  content: string;
  important: boolean;
}

const noteSchema = new Schema<INote>({
  content: {
    type: String,
    minlength: 5,
    required: true,
  },
  important: Boolean,
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Note', noteSchema);
