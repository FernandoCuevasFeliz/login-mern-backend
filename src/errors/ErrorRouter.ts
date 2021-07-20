import { MongoError } from 'mongodb';
import { Error as MongooseError } from 'mongoose';
import { Router } from 'express';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { ErrorHandler } from './ErrorHandler';

interface Rotes {
  get(...hadlers: Handler[]): Rotes;
  post(...hadlers: Handler[]): Rotes;
  put(...hadlers: Handler[]): Rotes;
  patch(...hadlers: Handler[]): Rotes;
  delete(...hadlers: Handler[]): Rotes;
}

function errorParse(error: Error, next: NextFunction) {
  if (
    error instanceof MongoError ||
    error instanceof MongooseError.CastError ||
    error instanceof MongooseError.ValidationError
  ) {
    next(new ErrorHandler(BAD_REQUEST, error.message));
    return;
  }

  if (error instanceof ErrorHandler) {
    next(error);
    return;
  }

  next(new ErrorHandler(INTERNAL_SERVER_ERROR, 'Error performing actions'));
}

export class ErrorRouter {
  private _router = Router();

  get router() {
    return this._router;
  }
  constructor() {
    this.route.bind(this);
  }

  public route(path: string): Rotes {
    const get = this.get.bind(this);
    const post = this.post.bind(this);
    const put = this.put.bind(this);
    const patch = this.patch.bind(this);
    const deleteA = this.delete.bind(this);

    return {
      get(...handlers) {
        get(path, ...handlers);
        return this;
      },
      post(...handlers) {
        post(path, ...handlers);
        return this;
      },
      put(...handlers) {
        put(path, ...handlers);
        return this;
      },
      patch(...handlers) {
        patch(path, ...handlers);
        return this;
      },
      delete(...handlers) {
        deleteA(path, ...handlers);
        return this;
      },
    };
  }

  public get(path: string, ...handlers: Handler[]) {
    const handler = this.handlerException(handlers.pop());
    this.router.get(path, handlers, handler);
    return this;
  }

  public post(path: string, ...handlers: Handler[]) {
    const handler = this.handlerException(handlers.pop());
    this.router.post(path, handlers, handler);
    return this;
  }
  public put(path: string, ...handlers: Handler[]) {
    const handler = this.handlerException(handlers.pop());
    this.router.put(path, handlers, handler);
    return this;
  }
  public patch(path: string, ...handlers: Handler[]) {
    const handler = this.handlerException(handlers.pop());
    this.router.patch(path, handlers, handler);
    return this;
  }
  public delete(path: string, ...handlers: Handler[]) {
    const handler = this.handlerException(handlers.pop());
    this.router.delete(path, handlers, handler);
    return this;
  }

  public handlerException(handler: any) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        handler(req, res)?.catch((err: Error) => {
          errorParse(err, next);
        });
      } catch (error) {
        errorParse(error, next);
      }
    };
  }
}
