[rcon.js](../README.md) › [Globals](../globals.md) › ["Client"](../modules/_client_.md) › [Client](_client_.client.md)

# Class: Client

**`class`** Client

## Hierarchy

* **Client**

## Index

### Constructors

* [constructor](_client_.client.md#constructor)

### Properties

* [client](_client_.client.md#private-client)

### Methods

* [command](_client_.client.md#command)
* [destroy](_client_.client.md#destroy)
* [login](_client_.client.md#login)
* [decode](_client_.client.md#static-decode)
* [encode](_client_.client.md#static-encode)

## Constructors

###  constructor

\+ **new Client**(`host`: string, `port`: number): *[Client](_client_.client.md)*

*Defined in [Client.ts:54](https://github.com/dylhack/rcon.js/blob/6724b3b/src/Client.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`host` | string |
`port` | number |

**Returns:** *[Client](_client_.client.md)*

## Properties

### `Private` client

• **client**: *Socket*

*Defined in [Client.ts:54](https://github.com/dylhack/rcon.js/blob/6724b3b/src/Client.ts#L54)*

## Methods

###  command

▸ **command**(`cmd`: string): *Promise‹[RCONPacket](../modules/_client_.md#rconpacket)›*

*Defined in [Client.ts:84](https://github.com/dylhack/rcon.js/blob/6724b3b/src/Client.ts#L84)*

This sends commands to the RCON server. If an error occurred (ie authentication error) it
will reject with the same response packet.

**Parameters:**

Name | Type |
------ | ------ |
`cmd` | string |

**Returns:** *Promise‹[RCONPacket](../modules/_client_.md#rconpacket)›*

___

###  destroy

▸ **destroy**(): *void*

*Defined in [Client.ts:133](https://github.com/dylhack/rcon.js/blob/6724b3b/src/Client.ts#L133)*

Same as logging out. Once the connection is destroyed the authentication must be renewed
the next time connected.

**Returns:** *void*

___

###  login

▸ **login**(`password`: string): *Promise‹[RCONPacket](../modules/_client_.md#rconpacket)›*

*Defined in [Client.ts:66](https://github.com/dylhack/rcon.js/blob/6724b3b/src/Client.ts#L66)*

This sends an authentication request to the RCON server and upon approval this Promise
will resolve, otherwise it will reject with the same provided response packet.

**Parameters:**

Name | Type |
------ | ------ |
`password` | string |

**Returns:** *Promise‹[RCONPacket](../modules/_client_.md#rconpacket)›*

___

### `Static` decode

▸ **decode**(`data`: Buffer): *[RCONPacket](../modules/_client_.md#rconpacket)*

*Defined in [Client.ts:120](https://github.com/dylhack/rcon.js/blob/6724b3b/src/Client.ts#L120)*

This decodes a packet into an object

**Parameters:**

Name | Type |
------ | ------ |
`data` | Buffer |

**Returns:** *[RCONPacket](../modules/_client_.md#rconpacket)*

___

### `Static` encode

▸ **encode**(`type`: [PacketType](../enums/_client_.packettype.md), `id`: number, `body`: string): *Buffer*

*Defined in [Client.ts:103](https://github.com/dylhack/rcon.js/blob/6724b3b/src/Client.ts#L103)*

This encodes a packet to be used in a TCP request.

**Parameters:**

Name | Type |
------ | ------ |
`type` | [PacketType](../enums/_client_.packettype.md) |
`id` | number |
`body` | string |

**Returns:** *Buffer*
