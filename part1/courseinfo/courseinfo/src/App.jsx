const Header = (props) => {
  console.log(props.course.name)
    return (
      <h1>
        {props.course.name}
      </h1>
    )
  }

const Part = (props) => {
  return (
    <p>{props.name}: {props.ex}</p>
  )
}

const Content = (props) => {
  const [part1, part2, part3] = props.course.parts
  return (
    <div>
      <Part name={part1.name} ex={part1.exercises}/>
      <Part name={part2.name} ex={part2.exercises}/>
      <Part name={part3.name} ex={part3.exercises}/>
    </div>
  )
}

const Total = (props) => {
  const total = props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises
  return (
    <p>Number of exercises: {total}</p>
  )
}



const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  

  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course}/>
    </>
  )
}

export default App