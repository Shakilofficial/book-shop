import { ZodError } from 'zod';

export const formatError = (error: any) => {
  if (error instanceof ZodError) {
    return {
      message: 'Validation failed',
      success: false,
      error: error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      })),
    };
  }
  return {
    message: error.message || 'Something went wrong',
    success: false,
    error: {
      name: error.name || 'Error',
    },
  };
};
