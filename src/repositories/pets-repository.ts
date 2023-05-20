import { Pet, Prisma } from '@prisma/client';

export interface IPetsRepository {
  findManyByCity(city: string): Promise<Pet[]>;
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}
