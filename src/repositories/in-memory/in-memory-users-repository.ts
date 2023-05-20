import { Org, Prisma } from '@prisma/client';
import { IOrgsRepository } from '../orgs-repository';
import { randomUUID } from 'crypto';

export class InMemoryOrgsRepository implements IOrgsRepository {
  public items: Org[] = [];

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      city: data.city,
      street: data.street,
      number: data.number,
      zipcode: data.zipcode,
      whatsappNumber: data.whatsappNumber,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.items.push(org);

    return org;
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email);

    if (!org) {
      return null;
    }

    return org;
  }
}
