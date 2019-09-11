"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const lib_1 = __importDefault(require("./lib"));
const send_1 = __importDefault(require("./send"));
const rule_1 = __importDefault(require("./rule"));
exports.default = (app) => {
    app.use(lib_1.default());
    app.use(send_1.default());
    app.use(koa_bodyparser_1.default());
    rule_1.default({
        app,
        rules: [
            {
                path: path_1.default.join(__dirname, '../controller/admin'),
                name: 'admin'
            }
        ]
    });
    app.on('error', (err) => {
        console.log('middleware/index.ts 出错', err);
    });
};
