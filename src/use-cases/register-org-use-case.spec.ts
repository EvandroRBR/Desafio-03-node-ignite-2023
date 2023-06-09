import { beforeEach, describe, expect, it } from 'vitest';
import { compare } from 'bcryptjs';

import { RegisterOrgUseCase } from './register-org-use-case';
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository';
import { HttpError } from './errors/http-error';

let sut: RegisterOrgUseCase;
let OrgsRepository: InMemoryOrgsRepository;

describe('Register Orgs', () => {
  beforeEach(() => {
    OrgsRepository = new InMemoryOrgsRepository();
    sut = new RegisterOrgUseCase(OrgsRepository);
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
