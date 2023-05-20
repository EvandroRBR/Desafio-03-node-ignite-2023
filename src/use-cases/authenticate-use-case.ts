import { Org } from '@prisma/client';
import { compare } from 'bcryptjs';

import { HttpError } from './errors/org-already-exists-error';
import { IOrgsRepository } from '@/repositories/orgs-repository';

interface IAuthenticateUseCaseRequest {
  email: string;
  password: string;
}

export class AuthenticateUseCase {
  constructor(private orgsRepository: IOrgsRepository) {}

  async execute({
    email,
    password,
  }: IAuthenticateUseCaseRequest): Promise<Org> {
    const org = await this.orgsRepository.findByEmail(email);

    if (!org) {
      throw new HttpError('Invalid credentials.', 401);
    }

    const doesPasswordMatches = await compare(password, org.password_hash);

    if (!doesPasswordMatches) {
      throw new HttpError('Invalid credentials.', 401);
    }

    return org;
  }
}
