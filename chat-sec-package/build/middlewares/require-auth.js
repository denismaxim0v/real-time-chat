"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
var custom_errors_1 = require("@panthera-errors/custom-errors");
exports.requireAuth = function (req, res, next) {
    if (!req.currentUser) {
        throw new custom_errors_1.NotAuthorizedError();
    }
    next();
};
