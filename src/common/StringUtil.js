import { Buffer } from 'buffer'

export const toBase64 = (string) => {
    if (string instanceof String)
        return Buffer.from(string).toString('base64')

    return Buffer.from(string.toString()).toString('base64')
}

export const fromBase64 = (string) => {
    if (string instanceof String)
        return Buffer.from(string, 'base64').toString('ascii')

    return Buffer.from(string.toString(), 'base64').toString('ascii')
}