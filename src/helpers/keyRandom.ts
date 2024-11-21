import crypto from 'crypto'

const keyRandom = ()=> crypto.randomBytes(128).toString('hex')

export default keyRandom