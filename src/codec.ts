/**
 * Credit to Speedhaxx for the Node.JS version of
 * these functions
 */
export type RCONPacket = {
    size: number;
    id: number;
    type: PacketType;
    body: string;
}

export enum PacketType {
    SERVERDATA_RESPONSE_VALUE = 0,
    SERVERDATA_EXECCOMMAND = 2,
    SERVERDATA_AUTH_RESPONSE = 2,
    SERVERDATA_AUTH = 3
}

export function encode(type: PacketType, id: number, body: string): Buffer {
    let size = Buffer.byteLength(body) + 14,
        packet = Buffer.alloc(size);

    packet.writeInt32LE(size - 4, 0);
    packet.writeInt32LE(id, 4);
    packet.writeInt32LE(type, 8);
    packet.write(body, 12, size - 2, "ascii");
    packet.writeInt16LE(0, size - 2);

    return packet;
}

export function decode(data: Buffer): RCONPacket {
    return {
        size: data.readInt32LE(0),
        id: data.readInt32LE(4),
        type: data.readInt32LE(8),
        body: data.toString("ascii", 12, data.length - 2)
    }
}