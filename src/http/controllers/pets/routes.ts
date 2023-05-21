import { FastifyInstance } from 'fastify';

import { registerPetController } from './register-pet-controller';
import { searchPetsByCityController } from './search-pets-controller';
import { verifyJWT } from '@/http/middlewares/verify-jwt';

export async function petsRouter(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJWT] }, registerPetController);
  app.get('/pets', searchPetsByCityController);
}
