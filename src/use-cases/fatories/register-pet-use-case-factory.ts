import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository';
import { RegisterPetUseCase } from '../register-pet-use-case';

export function registerPetUseCaseFactory() {
  const petsRepository = new PrismaPetsRepository();
  const registerPetUseCase = new RegisterPetUseCase(petsRepository);

  return registerPetUseCase;
}
