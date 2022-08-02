const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <ul>
    {parts.map(part =>
      <li>
        <Part
          part={part}
        />
      </li>
      )}
  </ul>

const Course = ({course}) => {
  const sum = course.parts.reduce((total, part) => total + part.exercises,0)

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />

    </div>
  )
}

export default Course