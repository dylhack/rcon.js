/**
 * @author Dylan Hackworth <https://github.com/dylhack>
 * @LICENSE
 * Copyright (c) 2019 Dylan Hackworth. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this list of conditions
 * and the following disclaimer.

 * 2. Redistributions in binary form must reproduce the above copyright notice, this list of
 *  conditions and the following disclaimer in the documentation and/or other materials provided
 *  with the distribution. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 *  "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
 *  EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 *  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 *  PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 *  INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 *  LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 *  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
import { Client, PacketType, RCONPacket } from "../src";

const details = {
  host: '127.0.0.1',
  port: 27015
};
const password = 'password';
const client = new Client(details.host, details.port);

describe('Client', () => {
  it('login', async () => {
    const response: RCONPacket = await client.login(password);
    expect(response.type).toBe(PacketType.SERVERDATA_AUTH_RESPONSE);
    expect(response.id).toBe(22);
    expect(response.body).toBe('');
  });
  it('command', async () => {
    await client.login(password);
    const response: RCONPacket = await client.command('version');
    expect(response.body).toBeDefined();
    expect(response.type).toBe(PacketType.SERVERDATA_RESPONSE_VALUE);
    expect(response.id).toBe(53);
  })
});

describe('codec', () => {
  const encoded = Client.encode(PacketType.SERVERDATA_AUTH, 22, password);
  it('decode', () => {
    const decoded = Client.decode(encoded);
    expect(decoded.id).toBe(22);
    expect(decoded.type).toBe(PacketType.SERVERDATA_AUTH);
    expect(decoded.body).toBe('password');
    expect(decoded.size).toBe(18);
  });
});

afterAll(() => {
  client.destroy();
});