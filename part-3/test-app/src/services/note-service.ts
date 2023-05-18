import axios from "axios";
import { INote } from "../App";

const baseUrl = 'https://test-backend-q0hc.onrender.com/api';

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

const update = (id:number, note:INote) =>{
    return axios
            .put<INote>(baseUrl + '/notes' + '/' + id, note)
            .then((response)=>response.data);
}

export default{
    getAll,
    create,
    update
}