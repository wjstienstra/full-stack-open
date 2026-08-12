
const Header = ({name}) => <h3>{name}</h3>

const Content = ({parts}) => 
  parts.map(part => 
    <Part key={part.id} part={part}/>
  )

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = ({parts}) => {
  const totalEx = parts.reduce((s,p) =>
      s + p.exercises, 0
  )
  return (
    <p>Number of exercises {totalEx}</p>
  )

}

const Course = ({course}) => {
  const {name, parts} = course
  return (
    <>
      <Header name={name}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </>       
  )
}

const App = () => {
   const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web Development Curriculum</h1>
      {courses.map(course => <Course key={course.id} course={course}/> )}
    </div>
  )
}

export default App