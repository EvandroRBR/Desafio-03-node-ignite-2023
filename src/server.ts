import { app } from './app';
import { env } from './env/index';

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('\x1b[32mSERVER IS RUNNING\x1b[0m');
  });
