"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = (model, conditions) => {
    return new Promise((resolve, reject) => {
        model.create(conditions, (err, res) => {
            if (err) {
                reject(res);
            }
            else {
                resolve(res);
            }
        });
    });
};
// any可优化 https://mongoosejs.com/docs/api.html#query_Query-setOptions
exports.findOne = (model, conditions, fields, options) => {
    return new Promise((resolve, reject) => {
        model.findOne(conditions, fields, options, (err, res) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(res);
            }
        });
    });
};
