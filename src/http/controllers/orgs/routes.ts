import { FastifyInstance } from 'fastify';

import { registerOrgController } from './register-org-controller';
import { authenticateController } from './authenticate-controller';

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', registerOrgController);
  app.post('/sessions', authenticateController);
}
