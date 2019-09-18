import * as net from 'net'
import {decode, encode, PacketType, RCONPacket} from "./codec";

type Details = {
    host: string;
    port: number;
}

export class RCONClient {
    private client: net.Socket;

    constructor(details: Details) {
        this.client = net.createConnection(details);
    }

    login(password: string): Promise<RCONPacket> {
        return new Promise((resolve, reject) => {
            const encoded = encode(PacketType.SERVERDATA_AUTH, 22, password);
            this.client.once('data', (chunk: Buffer) => {
                const decoded = decode(chunk);
                if (decoded.id === -1) reject(decoded);
                else resolve(decoded);
            });
            this.client.write(encoded);
        });
    }

    command(cmd: string): Promise<RCONPacket> {
        return new Promise((resolve, reject) => {
            const encoded = encode(PacketType.SERVERDATA_EXECCOMMAND, 53, cmd);
            this.client.once('data', (chunk: Buffer) => {
                const decoded = decode(chunk);
                if (decoded.type != PacketType.SERVERDATA_RESPONSE_VALUE) reject(decoded);
                else resolve(decoded);
            });
            this.client.write(encoded);
        })
    }

    destroy() {
        this.client.destroy();
    }
}