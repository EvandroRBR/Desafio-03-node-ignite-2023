import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { randomUUID } from 'crypto';

import { app } from '@/app';
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-user';

describe('Search Pet e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it('should be able to search a pet by params', async () => {
    const { token } = await createAndAuthenticateOrg(app, true);
    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Bud',
        city: 'São José dos Campos',
        description: 'Animal legal',
        age: '4',
        orgId: randomUUID(),
      });

    const searchPetResponse = await request(app.server)
      .get('/pets')
      .query({
        city: 'São José dos Campos',
        name: 'Bud',
        description: 'legal',
        page: 1,
      })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(searchPetResponse.statusCode).toEqual(201);
    expect(searchPetResponse.body[0]).toEqual(
      expect.objectContaining({ name: 'Bud' }),
    );
  });
});
