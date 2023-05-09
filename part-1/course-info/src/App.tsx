const Header = (props:any) =>{
  return(
    <h1>{ props.name }</h1>
  );
}

const Content = (props:any) =>{
  return(
    <div>
      <p>
        { props.parts[0].name }: { props.parts[0].exercises }
      </p>
      <p>
        { props.parts[1].name }: { props.parts[1].exercises }
      </p>
      <p>
        { props.parts[2].name }: { props.parts[2].exercises }
      </p>
    </div>
  );
}

const Footer = (props:any) =>{
  return(
    <div>
      <p>Number of exercises { props.totalExercises }</p>
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

  const totalExercises = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises;

  return(
    <div>
      <Header name={ course.name }/>
      <Content parts={ course.parts }/>
      <Footer totalExercises={ totalExercises }/>
    </div>
  );
}

export default App;
