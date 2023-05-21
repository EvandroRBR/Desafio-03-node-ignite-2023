import { Pet, Prisma } from '@prisma/client';

export interface ISearchPetParams {
  city: string;
  name?: string;
  description?: string;
  age?: string;
}

export interface IPetsRepository {
  searchManyByParams(params: ISearchPetParams): Promise<Pet[]>;
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}
