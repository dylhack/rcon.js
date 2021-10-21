import { RCONPacket, PacketType } from './types';

type RCONEncoder = {
  encodeId: (id: number) => void;
  encodeBody: (body: string | Buffer) => void;
  encodeType: (type: number | PacketType) => void;
  getResult: () => Buffer;
}

export const OFFSET_SIZE = 0,
  OFFSET_ID = 4,
  OFFSET_TYPE = 8,
  OFFSET_BODY = (OFFSET_ID + OFFSET_TYPE);

export const SIZE_BODY_SIZE = 4,
  SIZE_ID = 4,
  SIZE_TYPE = 4,
  SIZE_TERM = 1,
  // SIZE_BODY can be one or more bytes.
  SIZE_BODY = 1,
  SIZE_HEAD = SIZE_ID + SIZE_TYPE + SIZE_BODY_SIZE,
  SIZE_ALL = SIZE_BODY + SIZE_BODY_SIZE + SIZE_ID + SIZE_TYPE + SIZE_TERM;

export const decodeSize = (data: Buffer) => data.readInt32LE(OFFSET_SIZE);
export const decodeId = (data: Buffer) => data.readInt32LE(OFFSET_ID);
export const decodeType = (data: Buffer) => data.readInt32LE(OFFSET_TYPE);
export const decodeBody = (data: Buffer) => data.toString(
  "ascii", OFFSET_BODY, data.length - 2,
);

export function getRCONEncoder(): RCONEncoder {
  let head = Buffer.alloc(SIZE_HEAD);
  let body = Buffer.alloc(1);

  const
    getResult = (): Buffer => {
      const
        size = head.byteLength + body.byteLength,
        result = Buffer.alloc(size);

      encodeSize(size - 4);
      head.copy(result, 0);
      body.copy(result, SIZE_HEAD);

      // write string terminator
      result.writeInt16LE(0, size - 2);


      return result;
    },
    encodeSize = (size: number) => head.writeInt32LE(size - 4, 0),
    encodeId = (id: number) => head.writeInt32LE(id, 4),
    encodeType = (type: number | PacketType) => head.writeInt32LE(type, 8),
    encodeBody = (payload: string | Buffer) => {
      const isStr = typeof payload === 'string';

      body = isStr
        ? Buffer.from(payload)
        : payload;
    };

    return {
      getResult,
      encodeBody,
      encodeId,
      encodeType,
    };
}


export function encodeRCON(
  id: number,
  type: number,
  body: string | Buffer,
): Buffer;
export function encodeRCON(opt: RCONPacket): Buffer;
export function encodeRCON(
  arg0: RCONPacket | number,
  arg1?: number,
  arg2?: string | Buffer,
): Buffer {
  const encoder = getRCONEncoder();

  if (typeof arg0 === 'object') {
    encoder.encodeBody(arg0.body);
    encoder.encodeId(arg0.id);
    encoder.encodeType(arg0.type);
    return encoder.getResult();
  }

  const id = arg0 as number;
  const type = arg1 as number;
  encoder.encodeId(id);
  encoder.encodeType(type);
  if (arg2 !== undefined) {
    encoder.encodeBody(arg2);
  }

  return encoder.getResult();
}

/**
 * This decodes a packet into an object
 * @param {Buffer} data
 * @returns {RCONPacket}
 */
export function decodeRCON(data: string | Buffer): RCONPacket {
  const payload = typeof data === 'string'
    ? Buffer.from(data)
    : data;
  const size = decodeSize(payload),
    id = decodeId(payload),
    type = decodeType(payload),
    body = decodeBody(payload),
    result = { id, size, type, body };

  return result;
}
