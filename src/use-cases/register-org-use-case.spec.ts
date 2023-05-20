import { beforeEach, describe, expect, it } from 'vitest';
import { compare } from 'bcryptjs';

import { RegisterOrgUseCase } from './register-org-use-case';
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-users-repository';
import { HttpError } from './errors/org-already-exists-error';

let sut: RegisterOrgUseCase;
let inMemoryOrgsRepository: InMemoryOrgsRepository;

describe('Register Orgs', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository();
    sut = new RegisterOrgUseCase(inMemoryOrgsRepository);
  });

  it('should create a new org', async () => {
    const org = await sut.execute({
      name: 'Pet Organization',
      city: 'São José dis',
      street: 'São Boaventura',
      number: '23',
      zipcode: '04650-185',
      whatsappNumber: '11999999999',
      email: 'org@email.com',
      password: '123456',
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it('should not create an org with email used', async () => {
    await sut.execute({
      name: 'Pet Organization',
      city: 'São José dis',
      street: 'São Boaventura',
      number: '23',
      zipcode: '04650-185',
      whatsappNumber: '11999999999',
      email: 'org@email.com',
      password: '123456',
    });

    await expect(() =>
      sut.execute({
        name: 'Pet Organization',
        city: 'São José dis',
        street: 'São Boaventura',
        number: '23',
        zipcode: '04650-185',
        whatsappNumber: '11999999999',
        email: 'org@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(HttpError);
  });

  it('should register a org with hashed password', async () => {
    const org = await sut.execute({
      name: 'Pet Organization',
      city: 'São José dis',
      street: 'São Boaventura',
      number: '23',
      zipcode: '04650-185',
      whatsappNumber: '11999999999',
      email: 'org@email.com',
      password: '123456',
    });

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      org.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBeTruthy();
  });
});
