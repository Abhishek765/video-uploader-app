import express from 'express';
import { loginUser, registerUser } from '../controllers/user.controller';
import { upload } from '../middlewares/multer.middleware';

const router = express.Router();

router.route('/register').post(
  upload.fields([
    {
      name: 'avatar',
      maxCount: 1
    },
    {
      name: 'coverImage',
      maxCount: 1
    }
  ]),
  registerUser
);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

export { router as userRouter };
