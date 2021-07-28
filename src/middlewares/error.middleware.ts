import { INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status-codes';

export const pageNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = NOT_FOUND;
  res.status(statusCode).json({
    status: 'Error',
    statusCode,
    url: req.url,
  });
};

export const internalError = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message, statusCode = INTERNAL_SERVER_ERROR } = error;
  return res.status(statusCode).json({
    status: 'Error',
    statusCode,
    message,
  });
};
