import mongoose, { Schema } from 'mongoose';

// Blog interface
export interface Blog extends mongoose.Document {
  id: string;
  title: string;
  author: string;
  url: string;
  likes: number;
  user: mongoose.Types.ObjectId;
  comments: string[];
}

// Mogoose blog schema
const blogSchema: Schema<Blog> = new mongoose.Schema<Blog>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: { type: [String], required: false, default: [] },
});

// Mongoose transformation to JSON add property id:string, delete properties _id and __v
blogSchema.set('toJSON', {
  transform: (_doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

module.exports = mongoose.model<Blog>('Blog', blogSchema);
