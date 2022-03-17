 import * as express from 'express';

 import Routes from './routes/routes';
 
 class Server {

     private _express: express.Application;
     private _routes : Routes;
     constructor () {
         this._express = express.default();
         this._express.use(express.json());
         this._express.use(express.static("../client/build"));
         this._routes = new Routes
         this._express.use('/', this._routes.getRouter());
     }
 
     public init (port: number): any {
         // Start the server on the specified port
         this._express.listen(port, () => {
             return console.log("Server Running @ http://localhost:",port);
         }).on('error', (_error) => {
             return console.log('Error: ', _error.message);
          });;
     }
 }
 
 export default new Server();