import { Response } from 'express';

export function handleError(res: Response, error: unknown, defaultMessage: string) {
  console.error(defaultMessage);

  if (error instanceof Error) {
    res.status(500).json({
      error: defaultMessage,
      details: error.message,
    });
  } else {
    res.status(500).json({
      error: defaultMessage,
      details: 'Unknown error occurred',
    });
  }
}
