import { Prisma } from '@prisma/client';
import { IPetsRepository } from '../pets-repository';
import { prisma } from '@/lib/prisma';

export class PrismaPetsRepository implements IPetsRepository {
  async findManyByCity(city: string) {
    const petsByCity = await prisma.pet.findMany({
      where: { city },
      include: {
        org: {
          select: {
            whatsappNumber: true,
          },
        },
      },
    });

    return petsByCity;
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data });

    return pet;
  }
}
