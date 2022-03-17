"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpclient_1 = __importDefault(require("./httpclient"));
class StarWarsApi extends httpclient_1.default {
    constructor() {
        super("https://swapi.py4e.com/api");
        this.getPeople = (page = "1") => __awaiter(this, void 0, void 0, function* () { return yield this.instance.get(`/people?page=${page}`); });
        this.getPersonById = (id) => __awaiter(this, void 0, void 0, function* () { return yield this.instance.get(`/people/${id}`); });
    }
    static getInstance() {
        if (!this.apiInstance) {
            this.apiInstance = new StarWarsApi();
        }
        return this.apiInstance;
    }
}
exports.default = StarWarsApi;
