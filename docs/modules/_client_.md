[rcon.js](../README.md) › [Globals](../globals.md) › ["Client"](_client_.md)

# External module: "Client"

## Index

### Enumerations

* [PacketType](../enums/_client_.packettype.md)

### Classes

* [Client](../classes/_client_.client.md)

### Type aliases

* [RCONPacket](_client_.md#rconpacket)

## Type aliases

###  RCONPacket

Ƭ **RCONPacket**: *object*

*Defined in [Client.ts:31](https://github.com/dylhack/rcon.js/blob/6724b3b/src/Client.ts#L31)*

Every packet has the same structure this is a representation of a response & request.

**`type`** RCONPacket

#### Type declaration:

* **body**: *string*

* **id**: *number*

* **size**: *number*

* **type**: *[PacketType](../enums/_client_.packettype.md)*
