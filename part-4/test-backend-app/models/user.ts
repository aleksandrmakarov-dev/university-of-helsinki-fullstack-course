import mongoose, { Schema } from 'mongoose';

const uniqueValidator = require('mongoose-unique-validator')

export interface User {
  username: string;
  name: string;
  passwordHash: string;
  notes?: any;
}

export interface UserDTO {
  username: string;
  name: string;
  notes?: any;
}

const userSchema: Schema<User> = new mongoose.Schema<User>({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  passwordHash: { type: String, required: true },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note',
    },
  ],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;

    delete returnedObject.passwordHash;
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
