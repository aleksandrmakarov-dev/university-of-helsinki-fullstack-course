import React, { FC } from 'react';
import { IPerson } from '../../App';
import NumberListItem from '../NumberListItem/NumberListItem';


interface NumberListProps {
  persons:IPerson[];
  handlePersonRemove:(id:string)=>void
}

const NumberList: FC<NumberListProps> = ({persons,handlePersonRemove}) => {
  if(persons.length > 0){
    return(
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person:IPerson) => 
            <NumberListItem key={person.id} name={person.name} number={person.number} handlePersonRemove={()=>handlePersonRemove(person.id)}/>
          )}
        </tbody>
      </table>
    )
  }else{
    return(
      <p>No phone numbers</p>
    )
  }
}

export default NumberList;
