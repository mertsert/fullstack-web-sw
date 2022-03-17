
import { Router } from 'express';

import Cache from './cache';
import PeopleController from '../controllers/people';

class Routes {
    
    private _router : Router;
    private _cacheFunc : any;

    constructor () {
        this._router = Router();
        this._cacheFunc = Cache.cache;

        this.setListeners();
    }
    public getRouter() : Router
    {
        return this._router;
    }
    private setListeners() : void
    {
        const cachedTime = 120;
        this._router.get('/people', this._cacheFunc(cachedTime), PeopleController.GetPeople);
        this._router.get('/people/:id', this._cacheFunc(cachedTime), PeopleController.GetPersonById);
    }
}
export default Routes; 

