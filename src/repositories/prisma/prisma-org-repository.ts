import { Prisma } from '@prisma/client';

import { prisma } from '../../lib/prisma';
import { IOrgsRepository } from '../orgs-repository';

export class PrismaOrgsRepository implements IOrgsRepository {
  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: { email },
    });

    return org;
  }

  async create(data: Prisma.OrgCreateInput) {
    const createdOrd = await prisma.org.create({ data });

    return createdOrd;
  }
}
