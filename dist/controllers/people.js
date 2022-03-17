"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swapi_1 = __importDefault(require("../services/swapi"));
class PeopleController {
    static GetPeople(req, res, next) {
        const { page } = req.query;
        const api = swapi_1.default.getInstance();
        api.getPeople(page).then((data) => {
            return res.status(200).json(data);
        }).catch((reason) => {
            console.log(reason);
            return res.status(500).send(reason);
        });
    }
    static GetPersonById(req, res, next) {
        const api = swapi_1.default.getInstance();
        api.getPersonById(req.params.id).then((data) => {
            return res.status(200).json(data);
        }).catch((reason) => {
            console.log(reason);
            return res.status(500).send(reason);
        });
    }
}
exports.default = PeopleController;
