"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
mongoose_1.default.set('debug', true);
const DB_URL = `mongodb://${config_1.default.mongodb.address}/${config_1.default.mongodb.db}`;
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect(DB_URL, (err) => {
    if (err) {
        console.log('mongoose 连接失败');
    }
    else {
        console.log('mongoose 连接成功');
    }
});
exports.default = mongoose_1.default;
