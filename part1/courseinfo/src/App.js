const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercise}</p>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercise {props.exercises[0] + props.exercises[1] + props.exercises[2]}</p>
  )
}

const App = () => {
  
  const course = {
    name: 'Half Stack application developement',
    parts: [
      {
        name : 'Fundamentals of React',
        exercise : 10
      },
      {
        name : 'Using props to pass data',
        exercise : 7
      },
      {
        name : 'State of a component',
        exercise : 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts.map(obj=>{return obj.exercise})} />
    </div>
  )
}

export default App;
