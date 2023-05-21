import { Pet } from '@prisma/client';

import {
  IPetsRepository,
  ISearchPetParams,
} from '@/repositories/pets-repository';

export class SearchPetsUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute(query: ISearchPetParams): Promise<Pet[]> {
    const petsByCity = await this.petsRepository.searchManyByParams(query);

    return petsByCity;
  }
}
