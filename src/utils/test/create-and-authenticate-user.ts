import { hash } from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import request from 'supertest';

import { prisma } from '@/lib/prisma';

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await prisma.org.create({
    data: {
      name: 'Pet Organization',
      city: 'São José dis',
      street: 'São Boaventura',
      number: '23',
      zipcode: '04650-185',
      whatsappNumber: '11999999999',
      email: 'org@email.com',
      password_hash: await hash('123456', 6),
    },
  });

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'org@email.com',
    password: '123456',
  });

  const { token } = authResponse.body;

  return token;
}
