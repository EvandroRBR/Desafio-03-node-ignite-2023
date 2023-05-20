import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { registerPetUseCaseFactory } from '@/use-cases/fatories/register-pet-use-case-factory';

export async function registerPetController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerPetBodySchema = z.object({
    name: z.string().nonempty(),
    city: z.string().nonempty(),
    description: z.string().nonempty(),
    age: z.string().nonempty(),
  });

  const { name, city, description, age } = registerPetBodySchema.parse(
    request.body,
  );

  const registerPetUseCase = registerPetUseCaseFactory();

  const pet = await registerPetUseCase.execute({
    name,
    city,
    description,
    age,
    orgId: request.user.sub,
  });

  return reply.status(201).send(pet);
}
