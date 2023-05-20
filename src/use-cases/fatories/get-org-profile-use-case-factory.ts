import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-org-repository';
import { GetOrgProfileUseCase } from '../get-org-profile-use-case';

export function GetOrgProfileUseCaseFactory() {
  const orgsRepository = new PrismaOrgsRepository();
  const getOrgProfileUseCase = new GetOrgProfileUseCase(orgsRepository);

  return getOrgProfileUseCase;
}
