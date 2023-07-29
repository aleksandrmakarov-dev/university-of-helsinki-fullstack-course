import { FC } from 'react';
import PersonData from '../interfaces/PersonData';

interface PersonItemProps {
  person: PersonData;
}

const PersonItem: FC<PersonItemProps> = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  );
};

export default PersonItem;
