import { useState, useEffect } from 'react'
import bookService from './services/bookService'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null)
  const [style, setStyle] = useState("")

  const hook = () => {
    bookService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
      .catch(err => {
        setStyle('error')
        setMessage("error fetching data from backend api")
        setTimeout(() => {setMessage(null)}, 5000)
      })
  }
  
  useEffect(hook, [])
  console.log('render', persons.length, 'persons')
  
  const addToPhonebook = (event) => {
    event.preventDefault();
   
    // Busca el objeto existente por nombre
    const existingPerson = persons.find(person => person.name === newName);
   
    // Si la persona ya existe, actualiza su número
    if (existingPerson) {
       const updatedPerson = {
         ...existingPerson,
         number: newNumber,
         id: existingPerson.id.toString()
       }

       setPersons(persons.map(person => person.id === existingPerson.id ? updatedPerson : person))

       bookService.update(updatedPerson.id, updatedPerson)
         .then(response => {
         })
         .catch(error => {
           console.error(error)
         });
      
       setNewName('');
       setNewNumber('');
    } else {
       // Si la persona no existe, crea una nueva entrada
       const newPerson = {
         name: newName,
         number: newNumber,
         id: (persons.length + 1).toString()
       };

       setPersons(persons.concat(newPerson))

       bookService.create(newPerson)
         .then(response => {
         })
         .catch(error => {
           console.error(error)
         });

       setNewName('')
       setNewNumber('')
    }
   }

  const deletePerson = id => {
    const personToDelete = persons.filter(person => person.id === id)[0]
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      bookService
        .deletePerson(id)
        .then(res => {
          setPersons(persons.filter(person => person.id !== id))
          setMessage(`Information of ${personToDelete.name} removed from server successfully`)
          setStyle('success')
          setTimeout(() => {setMessage(null)}, 5000)
        })
        .catch(err => {
          setMessage(`Information of ${personToDelete.name} has already been removed from server`)
          setStyle('error')
          setTimeout(() => {setMessage(null)}, 5000)
          setPersons(persons.filter(p => p.name !== personToDelete.name))
        })
    }
  }

  return (
    <div onSubmit={addToPhonebook}>
      <h2>Phonebook</h2>
      <Notification message={message} style={style} />
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App