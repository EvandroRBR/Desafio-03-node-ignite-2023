import { FastifyInstance } from 'fastify';

import { registerPetController } from './register-pet-controller';
import { findPetsByCityController } from './find-pets-by-city-contoller';
import { verifyJWT } from '@/http/middlewares/verify-jwt';

export async function petsRouter(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJWT] }, registerPetController);
  app.get('/pets', findPetsByCityController);
}
