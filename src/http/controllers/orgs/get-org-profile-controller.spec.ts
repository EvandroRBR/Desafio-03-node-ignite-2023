// import { beforeAll, afterAll, describe, expect, it } from 'vitest';
// import request from 'supertest';

// import { app } from '@/app';

// describe('Get Profile e2e', () => {
//   beforeAll(async () => {
//     await app.ready();
//   });

//   afterAll(async () => {
//     await app.close();
//   });

//   it('should be able to get an organization profile', async () => {
//     const org = await request(app.server).post('/orgs').send({
//       name: 'Pet Organization',
//       city: 'São José dis',
//       street: 'São Boaventura',
//       number: '23',
//       zipcode: '04650-185',
//       whatsappNumber: '11999999999',
//       email: 'org@email.com',
//       password: '123456',
//     });

//     const response = await request(app.server).get('/sessions').send(org.id);

//     expect(response.statusCode).toEqual(200);
//   });
// });
