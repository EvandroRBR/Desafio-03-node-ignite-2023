import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-org-repository';
import { RegisterOrgUseCase } from '../register-org-use-case';

export function registerOrgUseCaseFactory() {
  const orgsRepository = new PrismaOrgsRepository();
  const registerOrgUseCase = new RegisterOrgUseCase(orgsRepository);

  return registerOrgUseCase;
}
