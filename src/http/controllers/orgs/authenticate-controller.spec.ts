import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

import { app } from '@/app';

describe('Authenticate e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it('should be able to authenticate', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Pet Organization',
      city: 'São José dis',
      street: 'São Boaventura',
      number: '23',
      zipcode: '04650-185',
      whatsappNumber: '11999999999',
      email: 'org@email.com',
      password: '123456',
    });

    const response = await request(app.server).post('/sessions').send({
      email: 'org@email.com',
      password: '123456',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ token: expect.any(String) });
  });
});
