import { Response } from 'express';

export function handleError(res: Response, error: any, defaultMessage: string) {
  console.error(defaultMessage);

  if (error.response) {
    console.error('Status:', error.response.status);
    console.error('Error Data:', error.response.data);
    res.status(500).json({
      error: defaultMessage,
      details: error.response.data,
    });
  } else {
    console.error('Error Message:', error.message);
    res.status(500).json({
      error: defaultMessage,
      details: error.message,
    });
  }
}
