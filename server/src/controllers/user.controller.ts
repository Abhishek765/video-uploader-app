import { asyncHandler } from '../utils/asyncHandler';
import { Response, Request } from 'express';

/**
 * @description Register a new User
 * @method POST
 * @route /api/v1/users/register
 */
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password, username } = req.body;
    console.log({ email, password, username });

    // TODO: Add register logic
    // if (email! || password! || username!) {
    //   res.status(400).json({
    //     message: 'All fields are required'
    //   });
    //   //   throw new Error('All fields are required');
    // }

    res.status(201).json({ message: 'User Registered Successfully' });
  }
);

/**
 * @description Login a user
 * @method POST
 * @route /api/v1/users/login
 */
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: 'User loggedIn Successfully' });
});
