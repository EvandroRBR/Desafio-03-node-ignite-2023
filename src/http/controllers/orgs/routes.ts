import { FastifyInstance } from 'fastify';

import { registerOrgController } from './register-org-controller';
import { authenticateController } from './authenticate-controller';
import { getOrgProfileController } from './get-org-profile-controller';
import { refreshTokenController } from './refresh-token-controller';
import { verifyJWT } from '@/http/middlewares/verify-jwt';

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', registerOrgController);
  app.post('/sessions', authenticateController);

  app.patch('/refresh/token', refreshTokenController);

  app.get('/me', { onRequest: [verifyJWT] }, getOrgProfileController);
}
