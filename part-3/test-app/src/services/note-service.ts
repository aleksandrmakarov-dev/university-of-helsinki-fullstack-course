import axios from "axios";
import { INote } from "../App";

const baseUrl = '/api';

const getAll = () =>{
    return axios
            .get<INote[]>(baseUrl + '/notes')
            .then((response)=>response.data);
}

const create = (note:INote) =>{
    return axios
            .post<INote>(baseUrl + '/notes', note)
            .then((response)=>response.data);
}

const update = (id:string, note:INote) =>{
    return axios
            .put<INote>(baseUrl + '/notes' + '/' + id, note)
            .then((response)=>response.data);
}

export default{
    getAll,
    create,
    update
}