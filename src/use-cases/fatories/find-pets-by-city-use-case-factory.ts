import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository';
import { FindPetsByCityUseCase } from '../find-pets-by-city-use-case';

export function findPetsByCityUseCaseFactory() {
  const petsRepository = new PrismaPetsRepository();
  const findPetsByCityUseCase = new FindPetsByCityUseCase(petsRepository);

  return findPetsByCityUseCase;
}
