import HttpClient from './httpclient';

import People, { Person } from '../interfaces/people';

class StarWarsApi extends HttpClient {
    private static apiInstance?: StarWarsApi;
  
    private constructor() {
      super("https://swapi.py4e.com/api");
    }
  
    public static getInstance() {
      if (!this.apiInstance) {
        this.apiInstance = new StarWarsApi();
      }
  
      return this.apiInstance;
    }
  
    public getPeople =  async (page: string = "1") => await this.instance.get<People>(`/people?page=${page}`);
    public getPersonById = async (id: string) => await this.instance.get<Person>(`/people/${id}`);
}
export default StarWarsApi;