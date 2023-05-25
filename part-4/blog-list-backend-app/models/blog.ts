import mongoose, { Schema } from 'mongoose';

// Blog interface
export interface Blog {
  title: string;
  author: string;
  url: string;
  likes: number;
}

// Mogoose blog schema
const blogSchema: Schema<Blog> = new mongoose.Schema<Blog>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number },
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
