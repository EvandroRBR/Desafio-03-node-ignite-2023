import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { SearchPetsUseCaseFactory } from '@/use-cases/fatories/search-pets-use-case-factory';

export async function searchPetsByCityController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchPetQuerySchema = z.object({
    city: z.string().nonempty(),
    name: z.string().optional(),
    description: z.string().optional(),
    age: z.string().optional(),
  });

  const query = searchPetQuerySchema.parse(request.query);

  const searchPetsByCityUseCase = SearchPetsUseCaseFactory();

  const pets = await searchPetsByCityUseCase.execute(query);

  return reply.status(201).send(pets);
}
