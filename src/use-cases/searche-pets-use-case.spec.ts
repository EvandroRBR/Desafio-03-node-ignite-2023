import { describe, beforeEach, it, expect } from 'vitest';

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { SearchPetsUseCase } from './search-pets-use-case';
import { randomUUID } from 'crypto';

let petsRepository: InMemoryPetsRepository;
let sut: SearchPetsUseCase;

describe('Search Pets By City', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new SearchPetsUseCase(petsRepository);
  });

  it('should be able to search all pets by city', async () => {
    petsRepository.create({
      id: randomUUID(),
      name: 'Bud ',
      city: 'Taubaté',
      description: 'Animal legal ',
      age: '4',
      created_at: new Date(),
      org_id: randomUUID(),
    });

    for (let i = 1; i <= 5; i++) {
      petsRepository.create({
        id: randomUUID(),
        name: `Bud ${i}`,
        city: 'São José dos Campos',
        description: `Animal legal ${i}`,
        age: `${i}`,
        created_at: new Date(),
        org_id: randomUUID(),
      });
    }
    const pets = await sut.execute({ city: 'São José dos Campos' });

    expect(pets).toHaveLength(5);
  });

  it('should be able to search pets by params', async () => {
    petsRepository.create({
      id: randomUUID(),
      name: 'Bud ',
      city: 'São José dos Campos',
      description: 'Animal legal ',
      age: '4',
      created_at: new Date(),
      org_id: randomUUID(),
    });

    for (let i = 1; i <= 5; i++) {
      petsRepository.create({
        id: randomUUID(),
        name: `Bud ${i}`,
        city: 'São José dos Campos',
        description: `Animal legal ${i}`,
        age: `${i}`,
        created_at: new Date(),
        org_id: randomUUID(),
      });
    }
    const pets = await sut.execute({ city: 'São José dos Campos', age: '4' });

    expect(pets).toHaveLength(2);
  });
});
