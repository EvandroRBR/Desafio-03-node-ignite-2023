import { FastifyReply, FastifyRequest } from 'fastify';

import { GetOrgProfileUseCaseFactory } from '@/use-cases/fatories/get-org-profile-use-case-factory';

export async function getOrgProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getOrgProfileUseCase = GetOrgProfileUseCaseFactory();
  const profile = await getOrgProfileUseCase.execute(request.user.sub);

  return reply
    .status(200)
    .send({ profile: { ...profile, password_hash: undefined } });
}
