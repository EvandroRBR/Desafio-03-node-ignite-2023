import { describe, beforeEach, it, expect } from 'vitest';
import { hash } from 'bcryptjs';

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { AuthenticateUseCase } from './authenticate-use-case';
import { HttpError } from './errors/org-already-exists-error';

let orgsRepository: InMemoryOrgsRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Org', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateUseCase(orgsRepository);
  });

  it('should be able to authenticate', async () => {
    orgsRepository.create({
      name: 'Pet Organization',
      city: 'São José dis',
      street: 'São Boaventura',
      number: '23',
      zipcode: '04650-185',
      whatsappNumber: '11999999999',
      email: 'org@email.com',
      password_hash: await hash('123456', 6),
    });

    const org = await sut.execute({
      email: 'org@email.com',
      password: '123456',
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'wrong-org@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(HttpError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    orgsRepository.create({
      name: 'Pet Organization',
      city: 'São José dis',
      street: 'São Boaventura',
      number: '23',
      zipcode: '04650-185',
      whatsappNumber: '11999999999',
      email: 'org@email.com',
      password_hash: await hash('123456', 6),
    });

    await expect(() =>
      sut.execute({
        email: 'org@email.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(HttpError);
  });
});
