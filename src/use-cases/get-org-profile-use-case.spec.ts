import { beforeEach, describe, expect, it } from 'vitest';
import { hash } from 'bcryptjs';

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { GetOrgProfileUseCase } from './get-org-profile-use-case';
import { HttpError } from './errors/org-already-exists-error';

let orgsRepository: InMemoryOrgsRepository;
let sut: GetOrgProfileUseCase;

describe('Get org profile', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new GetOrgProfileUseCase(orgsRepository);
  });

  it('should be able to get an organization profile', async () => {
    const org = await orgsRepository.create({
      name: 'Pet Organization',
      city: 'São José dis',
      street: 'São Boaventura',
      number: '23',
      zipcode: '04650-185',
      whatsappNumber: '11999999999',
      email: 'org@email.com',
      password_hash: await hash('123456', 6),
    });

    const profile = await sut.execute(org.id);

    expect(profile.id).toEqual(expect.any(String));
    expect(profile.name).toEqual('Pet Organization');
  });

  it('should not be able to get an organization profile with wrong id ', async () => {
    await expect(() => sut.execute('wrong-id')).rejects.toBeInstanceOf(
      HttpError,
    );
  });
});
