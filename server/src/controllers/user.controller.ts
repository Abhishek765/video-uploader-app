import { asyncHandler } from '../utils/asyncHandler';
import { Response, Request } from 'express';
import { UserModel } from '../models/user.model';
import { ApiError } from '../utils/ApiError';
import { uploadOnCloudinary } from '../services/cloudinary';
import { MulterFiles } from '../@types';
import { ApiResponse } from '../utils/ApiResponse';

/**
 * @description Register a new User
 * @method POST
 * @route /api/v1/users/register
 */
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password, userName, fullName } = req.body;

    // Validation check
    if (
      [email, password, userName, fullName].some(
        (field) => !field || field?.trim() === ''
      )
    ) {
      throw new ApiError(400, 'All fields are required');
    }

    // Checking if user with email or userName already exists
    const existsUser = await UserModel.findOne({
      $or: [{ email }, { userName }]
    });

    if (existsUser) {
      throw new ApiError(409, 'User already exists');
    }

    //checking for cover image and avatar
    const files = req.files as unknown as MulterFiles; // Cast req.files to MulterFiles
    const avatarLocalPath = files?.avatar[0]?.path;
    const coverImageLocalPath = files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
      throw new ApiError(400, 'Avatar  file is required');
    }

    // upload them to cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
      throw new ApiError(400, 'Avatar Failed to upload');
    }

    // create the new user object
    const newUser = {
      email,
      password, // password hashing is already handled via 'save' event
      fullName,
      userName: userName.toLowerCase(),
      avatar: avatar.url,
      coverImage: coverImage?.url || ''
    };

    const user = await UserModel.create(newUser);

    // from response object remove the password and refresh token fields
    const createdUser = await UserModel.findById(user._id).select(
      '-password -refreshToken'
    );

    // check if user created successfully
    if (!createdUser) {
      throw new ApiError(
        500,
        'Something went wrong while registering the user'
      );
    }

    res
      .status(201)
      .json(new ApiResponse(201, createdUser, 'User Registered Successfully'));
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
