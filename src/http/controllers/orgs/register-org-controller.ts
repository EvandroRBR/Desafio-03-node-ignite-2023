import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { registerOrgUseCaseFactory } from '@/use-cases/fatories/register-org-use-case-factory';

export async function registerOrgController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createOrgBodySchema = z.object({
    name: z.string().nonempty(),
    city: z.string().nonempty(),
    street: z.string().nonempty(),
    number: z.string().nonempty(),
    zipcode: z.string().nonempty(),
    whatsappNumber: z.string().nonempty(),
    email: z.string().email().nonempty(),
    password: z.string().min(6),
  });

  const {
    name,
    city,
    street,
    number,
    zipcode,
    whatsappNumber,
    email,
    password,
  } = createOrgBodySchema.parse(request.body);

  const registerOrgUseCase = registerOrgUseCaseFactory();

  await registerOrgUseCase.execute({
    name,
    city,
    street,
    number,
    zipcode,
    whatsappNumber,
    email,
    password,
  });

  return reply.status(201).send({ message: 'Organization created!' });
}
