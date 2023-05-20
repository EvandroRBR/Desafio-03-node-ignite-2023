// Deve ser possível cadastrar um pet
// Um pet deve estar ligado a uma org

import { IPetsRepository } from '@/repositories/pets-repository';
import { Pet } from '@prisma/client';

interface IRegisterPetUseCaseRequest {
  name: string;
  city: string;
  description: string;
  age: string;
  orgId: string;
}

export class RegisterPetUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute({
    name,
    city,
    description,
    age,
    orgId,
  }: IRegisterPetUseCaseRequest): Promise<Pet> {
    const pet = await this.petsRepository.create({
      name,
      city,
      description,
      age,
      org_id: orgId,
    });

    return pet;
  }
}
