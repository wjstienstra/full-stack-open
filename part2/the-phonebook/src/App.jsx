import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
    .catch(error => {
      console.log(error)
      setErrorMessage(`Phonebook could not be loaded`)
      setTimeout(() => {setErrorMessage(null)}, 5000)
    })
  }, [])
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleClick = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {

      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const currentPerson = persons.find(p => p.name === newName)
        const newObject = {
          name: newName,
          number: newNumber,
        }
        personService
        .update(currentPerson.id, newObject)
        .then(data => {
          console.log(data)
          setPersons(persons.map(person => person.id === currentPerson.id ? data : person))
          setErrorMessage(
            `The phonenumber of ${newName} is updated`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error)
          setErrorMessage(`an error occured`)
          setTimeout(()=> {setErrorMessage(null)},5000)
        })
      }
    } else {
      const newPerson = {
      name: newName,
      number: newNumber,
      }
      personService
      .create(newPerson)
      .then(data => {
        setPersons(persons.concat(data))
        setNewName('')
        setNewNumber('')
        setErrorMessage(
            `A new person is created ${newName}, phonenumber: ${newNumber}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
      })
      .catch(error => {
        console.log(error)
        setErrorMessage('Failed to create a new person in the phonebook')
        setTimeout(()=> {setErrorMessage(null)},5000)
      })     
    }
  }

  const handleDelete = (id) => {
    const currentPerson = persons.find(p => p.id === id)
    console.log(currentPerson)

    if (window.confirm(`Delete ${currentPerson.name}?`)) {
      personService
      .deletePerson(id)
      .then(data => {
        console.log(data)
        setPersons(persons.filter(p => p.id !== id))
        setErrorMessage(
            `${currentPerson.name} has been deleted from the phonebook`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
      })
      .catch(error => {
        console.log(error)
        setErrorMessage(
          `An error occured`
        )
      })
    }
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const searchResult = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) 

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />

      <Filter onChange={handleFilterChange} value={filter}/>      

      <h2>add a new</h2>
      
      <PersonForm 
      handleNameChange={handleNameChange} 
      handleNumberChange={handleNumberChange}
      handleClick={handleClick}
      newName={newName}
      newNumber={newNumber}
      />
      
      <h2>Numbers</h2>
      
      <PersonList searchResult={searchResult} handleDelete={handleDelete}/>
      
    </div>
  )
}

export default App