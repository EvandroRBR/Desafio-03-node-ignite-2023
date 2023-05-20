import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { findPetsByCityUseCaseFactory } from '@/use-cases/fatories/find-pets-by-city-use-case-factory';

export async function findPetsByCityController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerPetQuerySchema = z.object({
    city: z.string().nonempty(),
  });

  const { city } = registerPetQuerySchema.parse(request.query);

  const findPetsByCityUseCase = findPetsByCityUseCaseFactory();

  const pets = await findPetsByCityUseCase.execute(city);

  return reply.status(201).send(pets);
}
