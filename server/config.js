module.exports = {
  auth: {
    admin_secret: 'admin-token',
    tokenKey: 'Token-Auth'
  },
  port: process.env.NODE_ENV === 'production' ? 8082 : 4000,
  mongodb: {
    address: process.env.NODE_ENV === 'production' ? '127.0.0.1:19999' : '127.0.0.1:27017',
    db: 'blog'
  },
  qiniu: {
    accessKey: '0obooVgjip_PeXZBmplvt4OhOCDjvmrIeq98kWmU',
    secretKey: '6wqLFTYKb6L2QJJJEeehYwKcmRalkDMKnkpZ46ba',
    bucket: 'blog'
  },
  log: {
    logLevel: 'debug', // 指定记录的日志级别
    filename: './server/logs/cheese', // 指定日志存放的路径及名称
    projectName: 'blog', // 项目名，记录在日志中的项目信息
    ip: '0.0.0.0' // 默认情况下服务器 ip 地址
  }
}
