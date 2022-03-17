import { Request, Response, NextFunction } from "express";
import People, { Person } from "../interfaces/people";
import StarWarsApi from "../services/swapi";

 class PeopleController {

     public static GetPeople (req: Request, res : Response, next : NextFunction) {
        const { page } = req.query as any;
        const api = StarWarsApi.getInstance();

         api.getPeople(page).then((data: People) => {
            return res.status(200).json(data);
         }).catch((reason: any) => {
             console.log(reason);
             return res.status(500).send(reason);
         });
     }
     public static GetPersonById (req : Request, res : Response, next: NextFunction ) {
        const api = StarWarsApi.getInstance();

         api.getPersonById(req.params.id).then((data: Person) => {
            return res.status(200).json(data);
         }).catch((reason: any) => {
             console.log(reason);
             return res.status(500).send(reason);
         });
     }
 }
 export default PeopleController; 