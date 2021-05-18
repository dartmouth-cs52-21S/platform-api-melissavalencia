import { Router } from 'express';
import * as Posts from './controllers/post_controller';
import * as UserController from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

// const fetchPosts = async (req, res) => {
//   try {
//     const posts = await Posts.getPosts();
//     res.json(posts);
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };

// const fetchPost = async (req, res) => {
//   try {
//     const post = await Posts.getPost(req.params.id);
//     res.json(post);
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };

// const updatePost = async (req, res) => {
//   try {
//     const update = await Posts.updatePost(req.params.id, req.body);
//     res.json({ update });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };

// const deletePost = async (req, res) => {
//   try {
//     const remove = await Posts.deletePost(req.params.id);
//     res.json({ remove });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };

// const createPost = async (req, res) => {
//   try {
//     const create = await Posts.createPost(req.body);
//     res.json({ create });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };

/// your routes will go here
router.route('/posts')
  .get(async (req, res) => {
    try {
      const posts = await Posts.getPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error });
    }
  })
  .post(requireAuth, async (req, res) => {
    try {
      const create = await Posts.createPost({ ...req.body, author: req.user.id });
      res.json({ create });
    } catch (error) {
      res.status(500).json({ error });
    }
  });

router.route('/posts/:id')
  .get(async (req, res) => {
    try {
      const post = await Posts.getPost(req.params.id);
      res.json(post);
      console.log('in get');
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  })
  .put(requireAuth, async (req, res) => {
    try {
      await Posts.updatePost(req.params.id, req.body);
      const post = await Posts.getPost(req.params.id);
      res.json(post);
    } catch (error) {
      res.status(500).json({ error });
    }
  })
  .delete(requireAuth, async (req, res) => {
    try {
      const remove = await Posts.deletePost(req.params.id);
      res.json({ remove });
    } catch (error) {
      res.status(500).json({ error });
    }
  });

router.post('/signin', requireSignin, async (req, res) => {
  try {
    const token = UserController.signin(req.user);
    res.json({ token, email: req.user.email });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const token = await UserController.signup(req.body);
    res.json({ token, email: req.body.email });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

export default router;
