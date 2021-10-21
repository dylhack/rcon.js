/**
 * Every packet has the same structure this is a representation of a
 * response & request.
 * @type RCONPacket
 * @prop {number} size
 * @prop {number} id
 * @prop {PacketType} type
 * @prop {Buffer} body
 */
export type RCONPacket = {
  size: number;
  id: number;
  type: PacketType;
  body: string;
}

/**
 * These are the "types" of packet responses and requests their names are assigned to their
 * type in short-int form.
 * @enum PacketType
 */
export enum PacketType {
  RESPONSE_VALUE = 0,
  EXECCOMMAND = 2,
  AUTH_RESPONSE = 2,
  AUTH = 3
}
