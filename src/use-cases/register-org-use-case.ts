import { Org } from '@prisma/client';
import { hash } from 'bcryptjs';

import { IOrgsRepository } from '@/repositories/orgs-repository';
import { HttpError } from './errors/http-error.js';

interface IRegisterOrgRequest {
  name: string;
  city: string;
  street: string;
  number: string;
  zipcode: string;
  whatsappNumber: string;
  email: string;
  password: string;
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: IOrgsRepository) {}
  async execute({
    name,
    city,
    street,
    number,
    zipcode,
    whatsappNumber,
    email,
    password,
  }: IRegisterOrgRequest): Promise<Org> {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email);

    if (orgWithSameEmail) {
      throw new HttpError('Email already in use', 409);
    }

    const password_hash = await hash(password, 6);

    const org = await this.orgsRepository.create({
      name,
      city,
      street,
      number,
      zipcode,
      whatsappNumber,
      email,
      password_hash,
    });

    return org;
  }
}
