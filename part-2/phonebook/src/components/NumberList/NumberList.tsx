import React, { FC } from 'react';
import { IPerson } from '../../App';
import NumberListItem from '../NumberListItem/NumberListItem';


interface NumberListProps {
  persons:IPerson[];
}

const NumberList: FC<NumberListProps> = ({persons}) => {
  if(persons.length > 0){
    return(
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone number</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person:IPerson) => 
            <NumberListItem key={person.id} name={person.name} number={person.number}/>
          )}
        </tbody>
      </table>
    )
  }else{
    return(
      <p>No phone numbers added</p>
    )
  }
}

export default NumberList;
