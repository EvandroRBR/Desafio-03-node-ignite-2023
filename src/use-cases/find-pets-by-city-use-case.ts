import { IPetsRepository } from '@/repositories/pets-repository';
import { Pet } from '@prisma/client';

export class FindPetsByCityUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute(city: string): Promise<Pet[]> {
    const petsByCity = await this.petsRepository.findManyByCity(city);

    return petsByCity;
  }
}
