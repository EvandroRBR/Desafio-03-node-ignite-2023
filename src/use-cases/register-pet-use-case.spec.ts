import { beforeEach, describe, expect, it } from 'vitest';
import { randomUUID } from 'crypto';

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { RegisterPetUseCase } from './register-pet-use-case';

let petsRepository: InMemoryPetsRepository;
let sut: RegisterPetUseCase;

describe('Register Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new RegisterPetUseCase(petsRepository);
  });

  it('should be able to register a new pet', async () => {
    const pet = await sut.execute({
      name: 'Bud',
      city: 'São José dos Campos',
      description: 'Animal legal',
      age: '4',
      orgId: randomUUID(),
    });

    expect(pet.id).toEqual(expect.any(String));
  });
});
