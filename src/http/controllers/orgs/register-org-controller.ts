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
  console.log('teste=====================================');

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
  console.log('teste 2 =====================================');

  const registerOrgUseCase = registerOrgUseCaseFactory();

  console.log('teste 3 =====================================');

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

  console.log('teste 4 =====================================');

  return reply.status(201).send({ message: 'Organization created!' });
}
