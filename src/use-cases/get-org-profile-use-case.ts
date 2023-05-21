import { Org } from '@prisma/client';

import { IOrgsRepository } from '@/repositories/orgs-repository';
import { HttpError } from './errors/http-error';

export class GetOrgProfileUseCase {
  constructor(private orgsRepository: IOrgsRepository) {}

  async execute(id: string): Promise<Org> {
    const orgProfile = await this.orgsRepository.findById(id);

    if (!orgProfile) {
      throw new HttpError('Organization not found.', 404);
    }
    return orgProfile;
  }
}
