import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field
const PostSchema = new Schema({
  title: String,
  tags: String, // array or string
  content: String,
  coverUrl: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

// create PostModel class from schema
const PostModel = mongoose.model('Posts', PostSchema);

export default PostModel;
