"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cache_1 = __importDefault(require("./cache"));
const people_1 = __importDefault(require("../controllers/people"));
class Routes {
    constructor() {
        this._router = (0, express_1.Router)();
        this._cacheFunc = cache_1.default.cache;
        this.setListeners();
    }
    getRouter() {
        return this._router;
    }
    setListeners() {
        const cachedTime = 120;
        this._router.get('/people', this._cacheFunc(cachedTime), people_1.default.GetPeople);
        this._router.get('/people/:id', this._cacheFunc(cachedTime), people_1.default.GetPersonById);
    }
}
exports.default = Routes;
