import { FC } from 'react';

const Note: FC<{text:string}> = ({text}) => {
   return(
      <>
         <li>
            {text}
         </li>
      </>
   )
};

export default Note;
