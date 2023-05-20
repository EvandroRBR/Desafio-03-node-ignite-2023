import fastify from 'fastify';
import { ZodError } from 'zod';

import { orgsRoutes } from './http/controllers/orgs/routes';
import { env } from './env';
import { HttpError } from './use-cases/errors/org-already-exists-error';

export const app = fastify();

app.register(orgsRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error.', issues: error.format() });
  }

  if (error instanceof HttpError) {
    return error;
  }

  if (env.NODE_ENV === 'production') {
    console.error(error);
  }

  return reply.status(500).send({ message: 'Internal Server Error' });
});
