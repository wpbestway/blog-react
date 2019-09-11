"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const index_1 = __importDefault(require("./router/index"));
const middlewares_1 = __importDefault(require("./middlewares"));
require("./mongoose");
const config_1 = __importDefault(require("./config"));
const app = new koa_1.default();
middlewares_1.default(app);
index_1.default(app);
app.listen(config_1.default.port, '0.0.0.0', () => {
    console.log(`server is running at http://localhost:${config_1.default.port}`);
});
