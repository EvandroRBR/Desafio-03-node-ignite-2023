import { beforeAll, afterAll, describe, expect, it } from 'vitest';
import request from 'supertest';

import { app } from '@/app';
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-user';

describe('Get Profile e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get an organization profile', async () => {
    const { token } = await createAndAuthenticateOrg(app);

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(profileResponse.statusCode).toEqual(200);
    expect(profileResponse.body.profile).toEqual(
      expect.objectContaining({ email: 'org@email.com' }),
    );
  });
});
