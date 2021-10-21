import Client from '../src/client';

const
  host = process.env.RCON_HOST ||'127.0.0.1',
  port = process.env.RCON_PORT || '25575',
  password = process.env.RCON_PASSWORD = 'password';
let client: null | Client = null;

async function getClient(): Promise<Client> {
  if (client !== null) {
    return client;
  }
  client = await Client.connect({host, port: Number(port) });
  return client;
}

describe('Client functionality', () => {
  it('client can connect', () => {
    getClient()
      .then((cl) => {
        expect(cl).toBeDefined();
      });
  });

  it('client can login', async () => {
    const client = await getClient();
    const resp = await client.login(password);
    expect(resp).toBeDefined();
  })
});
