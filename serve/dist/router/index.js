"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const router = new koa_router_1.default();
exports.default = (app) => {
    router.get('/', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        console.log(88);
        ctx.response.type = 'html';
        // ctx.response.body = fs.createReadStream('../../admin/dist/index.html')
        ctx.response.body = `<html><body>aaaa</body></html>`;
        yield next();
    }));
    console.log(999);
    // router.get('/admin/blog/list', app.admin.blog.list)
    app.use(router.routes()).use(router.allowedMethods());
};
