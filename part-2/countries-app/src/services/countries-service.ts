import axios from "axios"

export interface Country{
    ccn3:number,
    name:Name,
    languages:any,
    area:number,
    capital:string[],
    flags:Flags
}

export interface Name{
    common:string
}

export interface Flags{
    png:string,
    svg:string,
    alt:string
}


const baseUrl = 'https://restcountries.com/v3.1/all';

const getAll = ():Promise<Country[]> =>{
    return axios
            .get<Country[]>(baseUrl)
            .then((response)=>response.data);
}

export default{
    getAll
}