import React, { FC } from 'react';


interface NumberListItemProps {
  name:string,
  number:string
}

const NumberListItem: FC<NumberListItemProps> = ({name,number}) => (
  <>
    <tr>
      <td>{name} </td>
      <td>{number}</td>
    </tr>
  </>
);

export default NumberListItem;
