import fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import { ZodError } from 'zod';

import { env } from './env';
import { HttpError } from './use-cases/errors/http-error';

import { orgsRoutes } from './http/controllers/orgs/routes';
import { petsRouter } from './http/controllers/pets/routes';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
});

app.register(fastifyCookie);

app.register(orgsRoutes);
app.register(petsRouter);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: '\x1b[31mValidation Error.\x1b[0m',
      issues: error.format(),
    });
  }

  if (error instanceof HttpError) {
    return error;
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  }

  return reply.status(500).send({ message: 'Internal Server Error' });
});
