import { Pet, Prisma } from '@prisma/client';
import { IPetsRepository, ISearchPetParams } from '../pets-repository';
import { randomUUID } from 'crypto';

export class InMemoryPetsRepository implements IPetsRepository {
  public items: Pet[] = [];

  async searchManyByParams({
    name,
    city,
    age,
    description,
    page,
  }: ISearchPetParams) {
    const pets = this.items
      .filter((item) => {
        if (name && item.name !== name) {
          return false;
        }
        if (city && item.city !== city) {
          return false;
        }
        if (age && item.age !== age) {
          return false;
        }
        if (description && item.description !== description) {
          return false;
        }
        return true;
      })
      .slice((page - 1) * 20, page * 20);

    return pets;
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      city: data.city,
      description: data.description,
      age: data.age,
      created_at: new Date(),
      org_id: data.org_id,
    };

    this.items.push(pet);

    return pet;
  }
}
