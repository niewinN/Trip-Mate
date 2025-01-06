import { Multer } from 'multer';

declare namespace Express {
  export interface Request {
    user?: {
      id: number;
    };
    file?: Multer.File;
  }
}
