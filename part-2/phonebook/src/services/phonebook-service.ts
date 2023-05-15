import axios from "axios"
import { IPerson } from "../App";

const baseUrl:string = 'http://localhost:3001';

const getAll = ():Promise<IPerson[]> =>{
    return axios
            .get<IPerson[]>(baseUrl + '/persons')
            .then((response)=>response.data);
}

const create = (person:IPerson):Promise<IPerson> =>{
    return axios
            .post<IPerson>(baseUrl + '/persons',person)
            .then((response)=>response.data);
}

const update = (id:number,person:IPerson):Promise<IPerson>  =>{
    return axios
            .put<IPerson>(baseUrl + '/persons' + '/' + id,person)
            .then((response)=>response.data);
}

const remove = (id:number) =>{
    return axios
            .delete(baseUrl + '/persons' + '/' + id);
}

export default{
    getAll,
    create,
    update,
    remove
}