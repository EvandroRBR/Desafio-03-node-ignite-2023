import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-org-repository';
import { AuthenticateUseCase } from '../authenticate-use-case';

export function authenticateUseCaseFactory() {
  const orgsRepository = new PrismaOrgsRepository();
  const authenticateUseCase = new AuthenticateUseCase(orgsRepository);

  return authenticateUseCase;
}
