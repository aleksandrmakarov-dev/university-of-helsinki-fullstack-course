const Header = (props:any) =>{
  return(
    <h1>{ props.name }</h1>
  );
}

const Content = (props:any) =>{
  return(
    <div>
      <Part part={ props.parts[0] }/>
      <Part part={ props.parts[1] }/>
      <Part part={ props.parts[2] }/>
    </div>
  );
}

const Part = (props:any) =>{
  return(
    <>
      <p>
        { props.part.name }: { props.part.exercises }
      </p>
    </>
  );
}

const Footer = (props:any) =>{

  const totalExercises = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises;
  return(
    <div>
      <p>Number of exercises { totalExercises }</p>
    </div>
  );
}

const App = () =>{

  const course = {
    name:'Half Stack application development',
    parts:[
      {name: 'Fundamentals of React', exercises: 10},
      {name: 'Using props to pass data', exercises: 7},
      {name: 'State of a component', exercises: 14}
    ]
  }

  return(
    <div>
      <Header name={ course.name }/>
      <Content parts={ course.parts }/>
      <Footer parts={ course.parts }/>
    </div>
  );
}

export default App;
