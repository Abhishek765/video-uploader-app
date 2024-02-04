import { NextFunction, Request, Response } from 'express';

export const asyncHandler = (
  requestHandlerFunc: (req: Request, res: Response, next: NextFunction) => void
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandlerFunc(req, res, next)).catch((err) =>
      next(err)
    );
  };
};
