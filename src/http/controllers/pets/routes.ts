import { FastifyInstance } from 'fastify';

import { registerPetController } from './register-pet-controller';
import { searchPetsByCityController } from './search-pets-controller';
import { verifyOrgRole } from '../../middlewares/verify-org-role';
import { verifyJWT } from '@/http/middlewares/verify-jwt';

export async function petsRouter(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);

  app.post(
    '/pets',
    { onRequest: [verifyOrgRole('ADMIN')] },
    registerPetController,
  );
  app.get('/pets', searchPetsByCityController);
}
