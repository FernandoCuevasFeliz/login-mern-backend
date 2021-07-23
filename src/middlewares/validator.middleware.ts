import { validationResult } from 'express-validator';
import { BAD_REQUEST } from 'http-status-codes';

export const validate =
  (validations: any[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }
    res.status(BAD_REQUEST).json({
      errors: errors.array(),
    });
  };
