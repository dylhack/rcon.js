import * as net from 'net';
import { RCONPacket, PacketType } from './types';
import {
  encodeRCON,
  decodeRCON,
  decodeSize,
  decodeType,
  decodeId,
  SIZE_HEAD,
  SIZE_ALL,
} from './util';

export default class Client {
  public socket: net.Socket;

  private constructor(socket: net.Socket) {
    this.socket = socket;
  }

  public static connect(
    options: net.NetConnectOpts,
    connectionListener?: () => void,
  ): Promise<Client> {
    const
      socket = net.createConnection(options, connectionListener),
      client = new Client(socket);
    const promise = new Promise<Client>((res, rej) => {
      const
        onError = (err: Error) => {
          socket.destroy();
          socket.removeAllListeners();
          rej(err);
        },
        onConnect = () => {
          socket.removeListener('error', onError);
          res(client);
        };
      socket.once('connect', onConnect);
      socket.once('error', onError)
    });
    return promise;
  }

  public login(password: string): Promise<RCONPacket> {
    return this.transaction(PacketType.AUTH, password);
  }

  public command(cmd: string): Promise<RCONPacket> {
    return this.transaction(PacketType.EXECCOMMAND, cmd);
  }

  public transaction(
    type: PacketType,
    payload: string,
  ): Promise<RCONPacket> {

    const
      id = (new Date()).getUTCSeconds(),
      encoded = encodeRCON(type, id, payload),
      promise = new Promise<RCONPacket>((resolve, reject) => {
        let
          // possible stages
          // 0 = read head
          // 1 = read rest
          // 2 = finish
          stage = 0,
          // receiving data as a string
          respStr = '',
          head = {
            body: '',
            id: 0,
            size: 0,
            type: 0,
          };
        const
          stageZero = () => {
            const size = Buffer.byteLength(respStr);
            if (size >= SIZE_HEAD) {
              const [size, id, type] = parseHead();
              head.size = size;
              head.id = id;
              head.type = type;
              stage += 1;
            }
          },
          parseHead = (): [number, number, number] => {
            const
              headBuff = Buffer.from(respStr),
              size = decodeSize(headBuff),
              type = decodeType(headBuff),
              id = decodeId(headBuff);

            return [size, id, type];
          },
          sanityCheck = () => {
            if (stage === 0) {
              return;
            }
            const
              size = Buffer.byteLength(respStr),
              promised = head.size;
            if (stage === 1) {
              if (size > promised) {
                fail(
                  'size of response is greater than promised'
                  + ` (at: ${size}b, promised: ${promised}b) `,
                );
              }
            } else if (stage === 2) {
              if (size < SIZE_ALL) {
                fail(
                  'size of response is less than the minimum size of an'
                  + ` RCON packet (at: ${size}, min: ${SIZE_ALL} bytes).`,
                );
              }
            }
          },
          closeAll = () => this.socket.removeAllListeners(),
          fail = (reason: Error | string) => {
            closeAll();
            if (typeof reason === 'string') {
              reject(new Error(reason));
            } else {
              reject(reason);
            }
          },
          onData = (chunk: Buffer) => {
            respStr += chunk;

            if (stage === 0) {
              stageZero();
            }

            sanityCheck();
          },
          onEnd = () => {
            stage = 2;
            closeAll();
            sanityCheck();
            const resp = Buffer.from(respStr);
            const decoded = decodeRCON(resp);
            resolve(decoded);
          },
          onError = (err?: Error) => fail(err || 'unknown issue');

        this.socket.on('data', onData);
        this.socket.on('end', onEnd)
        this.socket.once('error', onError);
        this.socket.write(encoded);
      });

    return promise;
  }
}
