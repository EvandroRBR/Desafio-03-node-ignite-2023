import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { randomUUID } from 'crypto';

import { app } from '@/app';
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-user';

describe('Register Pet e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it('should be able to register a pet', async () => {
    const { token } = await createAndAuthenticateOrg(app, true);
    const registerPetResponse = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Bud',
        city: 'São José dos Campos',
        description: 'Animal legal',
        age: '4',
        orgId: randomUUID(),
      });

    expect(registerPetResponse.statusCode).toEqual(201);
    expect(registerPetResponse.body).toEqual(
      expect.objectContaining({ name: 'Bud' }),
    );
  });
});
