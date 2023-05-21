import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import { ZodError } from 'zod';

import { env } from './env';
import { HttpError } from './use-cases/errors/http-error';

import { orgsRoutes } from './http/controllers/orgs/routes';
import { petsRouter } from './http/controllers/pets/routes';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(orgsRoutes);
app.register(petsRouter);

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
