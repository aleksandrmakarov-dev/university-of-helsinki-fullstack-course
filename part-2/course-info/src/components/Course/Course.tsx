import React, { FC } from 'react';

interface IPart{
  id:number,
  name:string,
  exercises:number
}

interface ICourse{
  id:number,
  name:string,
  parts:IPart[]
}

interface CourseProps {
  course:ICourse
}

//Header component: displays text in <h1></h1>
const Header: FC<{text:string}> = ({text}) =>{
  return(
    <h2>{ text }</h2>
  );
}

//Content component: displays parts of course with <Part/>
const Content:FC<{parts:IPart[]}> = ({parts}) =>{
  return(
    <div>
      {parts.map((part:IPart)=>
        <Part key={part.id} part={part}/>
      )}
    </div>
  );
}

//Part component: displays part name and number of exercises
const Part:FC<{part:IPart}> = ({part}) =>{
  return(
    <>
      <p>
        { part.name }: { part.exercises }
      </p>
    </>
  );
}

//Footer component: displays total number of execrises in the course
const Footer:FC<{parts:IPart[]}> = ({parts}) =>{

  const totalExercises = parts.map(p=>p.exercises).reduce((a,b)=>a+b);
  return(
    <div>
      <h3>Total number of exercises { totalExercises }</h3>
    </div>
  );
}



const Course: FC<CourseProps> = ({course}) => (
  <div>
    <Header text={course.name}/>
    <Content parts={course.parts}/>
    <Footer parts={course.parts}/>
  </div>
);

export default Course;
