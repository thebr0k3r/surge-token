import * as path from 'path'
import { readFile } from "fs/promises"


export default class SurgeToken {

    private netrc!: string
    private machine = 'surge.surge.sh'

    static async create() {
        const instance = new SurgeToken()
        await instance.init()
        return instance
    }

    public getToken() {
        const { password } = this.getCredentials()
        const str = `token:${password}`
        return Buffer.from(str, 'utf8').toString('base64')
    }

    public getCredentials() {

        const lines = this.netrc?.split('\n')?.map(ln => ln.trim())

        let idx = lines.indexOf(`machine ${this.machine}`)

        if (idx < 0) throw Error('no credentials found for surge')

        const login = lines[idx += 1]?.replace('login', '').trim()
        const password = lines[idx += 1]?.replace('password', '').trim()

        if (!login?.length && !password?.length) throw Error('no credentials found for surge')

        return {
            login,
            password
        }
    }

    public async init() {

        const home = process.env[(/^win/.test(process.platform)) ? 'USERPROFILE' : 'HOME']

        if (!home) throw Error('could not get file path')

        const netrcPath = path.join(home, '.netrc')

        this.netrc = await readFile(netrcPath, { encoding: 'utf-8' })
    }
}

