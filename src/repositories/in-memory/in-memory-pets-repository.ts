import { Pet, Prisma } from '@prisma/client';
import { IPetsRepository } from '../pets-repository';
import { randomUUID } from 'crypto';

export class InMemoryPetsRepository implements IPetsRepository {
  public items: Pet[] = [];

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
