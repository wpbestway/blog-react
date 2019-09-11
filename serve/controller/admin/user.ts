import userModel from '../../models/user'
import Koa from 'koa'
import fs from 'fs'
import crypto from 'crypto'

module.exports = {
  async prelogin (ctx: Koa.Context, next: Function) {
    const pubkey = fs.readFileSync('./rsa-pem/rsa_1024_pub.pem')
    ctx.send({
      pubkey: pubkey.toString('base64')
    })
  },
  async login (ctx: Koa.Context, next: Function) {
    const privKey = fs.readFileSync('./rsa-pem/rsa_1024_priv.pem')
    const username: string = ctx.request.body.username
    const pwd: string = ctx.request.body.pwd
    ctx.send({ name: username, pwd })
    // const pwdKey: string = ctx.request.body.pwdKey
    // const pwdButter: Buffer = new Buffer(pwdKey, 'base64')
    // const decryptedPwd = crypto.privateDecrypt({
    //   key: privKey,
    //   padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
    // }, pwdButter)
    // console.log(decryptedPwd.toString('utf8'))
  }
}