import { RCONPacket } from '../src/types';
import { encodeRCON, decodeRCON } from '../src/util';

describe('internal utilities', () => {
  const realWorldBuff = Buffer.from(
    [
      18,   0,   0,   0,  53,   0,  0,
       0,   1,   0,   0,   0, 112, 97,
     115, 115, 119, 111, 114, 100,  0,
       0
   ]
  );
  const realWorldObj: RCONPacket = {
    type: 1,
    body: 'password',
    id: 53,
    size: 18,
  }

  it('utilities can decode real-world example', () => {
    const resultObj = decodeRCON(realWorldBuff);

    expect(resultObj.body).toEqual(realWorldObj.body);
    expect(resultObj.id).toEqual(realWorldObj.id);
    expect(resultObj.type).toEqual(realWorldObj.type);
    expect(resultObj.size).toEqual(realWorldObj.size);
  });

  it('utilities can encode like real-world example', () => {
    const resultBuff = encodeRCON(realWorldObj);
    const equal = Buffer.compare(realWorldBuff, resultBuff);
    expect(equal).toBeTruthy();
  });
});
