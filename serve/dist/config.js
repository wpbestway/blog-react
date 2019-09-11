"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    auth: {},
    port: process.env.NODE_ENV === 'production' ? 9090 : 5000,
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
        logLevel: 'debug',
        filename: './server/logs/cheese',
        projectName: 'blog',
        ip: '0.0.0.0' // 默认情况下服务器 ip 地址
    }
};
