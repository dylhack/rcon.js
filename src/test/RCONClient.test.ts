import {RCONClient} from "../RCONClient";
import {DETAILS, PASSWORD} from "./credentials";
import {PacketType, RCONPacket} from "../codec";

const client = new RCONClient(DETAILS);

describe('RCONClient', () => {
    it('login', async () => {
        const response: RCONPacket = await client.login(PASSWORD);
        expect(response.type).toBe(PacketType.SERVERDATA_AUTH_RESPONSE);
        expect(response.id).toBe(22);
        expect(response.body).toBe('');
    });
    it('command', async () => {
        await client.login(PASSWORD);
        const response: RCONPacket = await client.command('seed');
        expect(response.body).toBe('Seed: -3089217541110555398');
        expect(response.type).toBe(PacketType.SERVERDATA_RESPONSE_VALUE);
        expect(response.id).toBe(53);
    })
});

afterAll(() => {
    client.destroy();
});