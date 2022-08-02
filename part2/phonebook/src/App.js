import { useState, useEffect } from 'react'
import personServices from './services/persons'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type} >
      {message}
    </div>
  )
}

const Person = ({person, deletePerson}) => {
  return (
  <li>{person.name} {person.number} <button onClick={() => deletePerson(person.name)}>delete</button></li>
  )
}

const InputField = ({text, value, onChange}) => {
  return (
  <div>
    {text} <input value={value} onChange={onChange} />
  </div> 
  )
}

const PersonForm = ({inputs, onSubmit, submitTxt}) => {
  return (
    <form onSubmit={onSubmit}>
    {inputs.map(inpt => 
      <InputField key={inpt.text} text={inpt.text} value={inpt.value} onChange={inpt.onChange}/>
  )}
    <div>
      <button type="submit">{submitTxt}</button>
    </div>
  </form>
  )
}

const Persons = ({persons, nameFilter, deletePerson}) => {
  return (
    <ul>
    {persons.filter((person) => nameFilter.test(person.name.toLowerCase())).map((person) =>
      <Person key={person.name} person={person} deletePerson={deletePerson} />
    )}
  </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123-456-7890' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState()
  const [notificationType, setNotificationType] = useState()

  useEffect(() => {
    personServices
      .getAll()
      .then(initPeople => {setPersons(initPeople)})
    }
  ,[])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (persons.filter((person) => person.name === newPerson.name).length !== 0){
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)){
        setPersons(persons.map(person => (person.name === newPerson.name) ? newPerson : person))
        personServices
          .update(persons.indexOf(persons.find(person => person.name === newPerson.name)) +1, newPerson)
          .catch(error => {
            setNotificationMessage(`information of ${newPerson.name} has already been removed from the server`)
            setNotificationType('errorNotification')
            errorCaught=True
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          setNotificationMessage('Changed number of ' + newPerson.name)
          setNotificationType('successNotification')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
      }
    } else {
      setPersons(persons.concat([newPerson]))
      personServices
        .create(newPerson)
      setNotificationMessage('Added ' + newPerson.name)
      setNotificationType('successNotification')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } 
    setNewName('')
    setNewNumber('')  
  }
  const formInputs = [
    {text:'name: ', value:newName, onChange:((event) => setNewName(event.target.value)) },
    {text:'number: ', value:newNumber, onChange:(event) => setNewNumber(event.target.value)}
  ]

  const deletePerson = (name) => { 
    if (window.confirm(`Delete ${name} ?`)){
      setPersons(persons.filter(person => person.name !== name))
      personServices  
        .deletePerson(persons.indexOf(persons.find(person => person.name === name)) +1)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} /> 
      <InputField text={'filter shown with '} value={nameFilter} onChange={(event) => setNameFilter(event.target.value)}/>
      <h2>add a new</h2>
      <PersonForm inputs={formInputs} onSubmit={addPerson} submitTxt={'add'} />
      <h2>Numbers</h2>
      <Persons persons={persons} nameFilter={RegExp(nameFilter.toLowerCase())} deletePerson={deletePerson} />
    </div>
  )
}

export default App