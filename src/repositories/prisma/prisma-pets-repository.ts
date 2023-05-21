import { Prisma } from '@prisma/client';
import { IPetsRepository, ISearchPetParams } from '../pets-repository';
import { prisma } from '@/lib/prisma';

export class PrismaPetsRepository implements IPetsRepository {
  async searchManyByParams({ city, age, description, name }: ISearchPetParams) {
    const petsByCity = await prisma.pet.findMany({
      where: {
        city,
        age,
        description: {
          contains: description,
        },
        name,
      },
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
