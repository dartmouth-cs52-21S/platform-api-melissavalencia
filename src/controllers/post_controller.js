import Post from '../models/post_model';

export const createPost = async (postFields) => {
  const post = new Post();
  post.title = postFields.title;
  post.tags = postFields.tags;
  post.content = postFields.content;
  post.coverUrl = postFields.coverUrl;
  // await creating a post
  // return post
  try {
    const savedpost = await post.save();
    return savedpost;
  } catch (error) {
    throw new Error(`create post error: ${error}`);
  }
};
export const getPosts = async () => {
  // await finding posts
  // return posts
  try {
    const allposts = await Post.find(); // .sort({ createdAt: -1 });
    return allposts;
  } catch (error) {
    throw new Error(`get posts error: ${error}`);
  }
};
export const getPost = async (id) => {
  // await finding one post
  // return post
  try {
    const onepost = await Post.findById(id);
    return onepost;
  } catch (error) {
    throw new Error(`get post error: ${error}`);
  }
};
export const deletePost = async (id) => {
  // await deleting a post
  // return confirmation
  try {
    const remove = await Post.deleteOne({ _id: id });
    return remove;
  } catch (error) {
    throw new Error(`delete post error: ${error}`);
  }
};
export const updatePost = async (id, postFields) => {
  // await updating a post by id
  // return *updated* post
  console.log(postFields);
  try {
    Post.findByIdAndUpdate(id, postFields).then((result) => {
      return result;
    });
  } catch (error) {
    throw new Error(`update post error: ${error}`);
  }
};
