import mongoose, { Schema } from 'mongoose';
import { Blog } from './blog';

const uniqueValidator = require('mongoose-unique-validator');

export interface User extends mongoose.Document {
  id: string;
  username: string;
  name: string;
  passwordHash: string;
  blogs: mongoose.Types.Array<Blog>;
}

const userScheme: Schema<User> = new Schema<User>({
  username: { type: String, required: true },
  name: { type: String, required: true },
  passwordHash: { type: String, required: true },
  blogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Blog',
    },
  ],
});

userScheme.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString();
    delete returnObject.passwordHash;
    delete returnObject._id;
    delete returnObject.__v;
  },
});

userScheme.plugin(uniqueValidator);

module.exports = mongoose.model<User>('User', userScheme);
