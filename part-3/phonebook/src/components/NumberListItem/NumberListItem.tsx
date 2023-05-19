import React, { FC } from 'react';


interface NumberListItemProps {
  name:string,
  number:string,
  handlePersonRemove:()=>void
}

const NumberListItem: FC<NumberListItemProps> = ({name,number,handlePersonRemove}) => (
  <>
    <tr>
      <td>{name} </td>
      <td>{number}</td>
      <td>
        <button onClick={handlePersonRemove}>Remove</button>
      </td>
    </tr>
  </>
);

export default NumberListItem;
