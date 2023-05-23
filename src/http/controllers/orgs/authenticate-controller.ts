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
  const org = await authenticateUseCase.execute({ email, password });

  const token = await reply.jwtSign(
    {
      role: org.role,
    },
    {
      sign: {
        sub: org.id,
      },
    },
  );

  const refreshToken = await reply.jwtSign(
    {
      role: org.role,
    },
    {
      sign: {
        sub: org.id,
        expiresIn: '7d',
      },
    },
  );

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token });
}
