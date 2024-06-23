"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const promises_1 = require("fs/promises");
class SurgeToken {
    netrc;
    machine = 'surge.surge.sh';
    static async create() {
        const instance = new SurgeToken();
        await instance.init();
        return instance;
    }
    getToken() {
        const { password } = this.getCredentials();
        const str = `token:${password}`;
        return Buffer.from(str, 'utf8').toString('base64');
    }
    getCredentials() {
        const lines = this.netrc?.split('\n')?.map(ln => ln.trim());
        let idx = lines.indexOf(`machine ${this.machine}`);
        if (idx < 0)
            throw Error('no credentials found for surge');
        const login = lines[idx += 1]?.replace('login', '').trim();
        const password = lines[idx += 1]?.replace('password', '').trim();
        if (!login?.length && !password?.length)
            throw Error('no credentials found for surge');
        return {
            login,
            password
        };
    }
    async init() {
        const home = process.env[(/^win/.test(process.platform)) ? 'USERPROFILE' : 'HOME'];
        if (!home)
            throw Error('could not get file path');
        const netrcPath = path.join(home, '.netrc');
        this.netrc = await (0, promises_1.readFile)(netrcPath, { encoding: 'utf-8' });
    }
}
exports.default = SurgeToken;
