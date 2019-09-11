"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
exports.default = (opts) => {
    const { app, rules = [] } = opts;
    if (!app)
        throw new Error('the app params is necessary!');
    app.router = {};
    const appKeys = Object.keys(app);
    rules.forEach((item) => {
        const { path, name } = item;
        if (appKeys.includes(name))
            throw new Error(`the name of ${name} already exists!`);
        const content = {};
        fs_1.default.readdirSync(path).forEach(filename => {
            const extname = path_1.default.extname(filename);
            if (extname === '.ts' || extname === '.js') {
                const name = path_1.default.basename(filename, extname);
                content[name] = require(path_1.default.join(path, filename));
                content[name].filename = name;
            }
        });
        app[name] = content;
    });
};
