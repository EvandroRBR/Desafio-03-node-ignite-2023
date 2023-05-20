import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { authenticateUseCaseFactory } from '@/use-cases/fatories/authenticate-use-case-factory';

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().nonempty(),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  const authenticateUseCase = authenticateUseCaseFactory();

  await authenticateUseCase.execute({ email, password });

  return reply.status(200).send();
}
