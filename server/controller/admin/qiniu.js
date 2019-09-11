import conf from '../../config'
import jwt from 'jsonwebtoken'
import qiniu from 'qiniu'
import { sortByKey } from '../../utils'

module.exports = {
  async gettoken (ctx, next) {
    let token = ctx.request.query.token
    try {
      jwt.verify(token, conf.auth.admin_secret)
      const mac = new qiniu.auth.digest.Mac(conf.qiniu.accessKey, conf.qiniu.secretKey)
      const options = { scope: conf.qiniu.bucket }
      const putPolicy = new qiniu.rs.PutPolicy(options)
      const uploadToken = putPolicy.uploadToken(mac)
      
      ctx.send({
        qiniu_token: uploadToken
      })
    } catch (e) {
      if ('TokenExpiredError' === e.name) {
        ctx.sendError('鉴权失败, 请重新登录!')
      }
      ctx.sendError('鉴权失败，请登录重试')
    }
  },

  async deleteResource (ctx, next) {
    let token = ctx.request.body.token
    let key = ctx.request.body.key
    try {
      jwt.verify(token, conf.auth.admin_secret)
      let mac = new qiniu.auth.digest.Mac(conf.qiniu.accessKey, conf.qiniu.secretKey)
      let bucketmanager = new qiniu.rs.BucketManager(mac)
      bucketmanager.delete(conf.qiniu.bucket, key, function (err, resBody, resInfo) {
        if (err) {
          ctx.sendError('server 删除失败')
        } else {
          ctx.send()
        }
      })
      ctx.send()
    } catch (e) {
      if ('TokenExpiredError' === e.name) {
        ctx.sendError('鉴权失败, 请重新登录!')
      }
      ctx.sendError('鉴权失败，请登录重试')
    }
  },

  async getList (ctx, next) {
    let token = ctx.request.body.token
    let prefix = ctx.request.body.prefix
    let options = {
      limit: 1000,
      prefix: prefix
    }
    try {
      jwt.verify(token, conf.auth.admin_secret)
      let mac = new qiniu.auth.digest.Mac(conf.qiniu.accessKey, conf.qiniu.secretKey)
      let bucketmanager = new qiniu.rs.BucketManager(mac)
      let listPrefix = () => {
        return new Promise((resolve, reject) => {
          bucketmanager.listPrefix(conf.qiniu.bucket, options, function (err, resBody, resInfo) {
            if (err) {
              reject(err)
            }
            if (resInfo && resInfo.statusCode === 200) {
              var items = resBody.items
              items.sort(sortByKey('putTime'))
              resolve(items)
            } else {
              reject('服务器错误')
            }
          })
        })
      }
      await listPrefix().then((res) => {
        ctx.send(res)
      }, () => {
        ctx.sendError('server 获取列表失败')
      })
    } catch (e) {
      if ('TokenExpiredError' === e.name) {
        ctx.sendError('鉴权失败, 请重新登录!')
      }
      ctx.sendError('鉴权失败，请登录重试')
    }
  }
}
