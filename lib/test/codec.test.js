"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var codec_1 = require("../codec");
describe('codec', function () {
    var encoded = codec_1.encode(codec_1.PacketType.SERVERDATA_AUTH, 22, 'password');
    it('decode', function () {
        var decoded = codec_1.decode(encoded);
        expect(decoded.id).toBe(22);
        expect(decoded.type).toBe(codec_1.PacketType.SERVERDATA_AUTH);
        expect(decoded.body).toBe('password');
        expect(decoded.size).toBe(18);
    });
});
