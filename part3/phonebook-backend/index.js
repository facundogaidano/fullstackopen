require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const Phonebook = require('./models/phonebook')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(requestLogger)

let persons = [
]

app.get('/api/persons', (request, response) => {
  Phonebook.find({}).then(persons => {
    response.json(persons)
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  } else if (body.number === undefined) {
    return response.status(400).json({ error: 'number missing' })
  }

  const book = new Phonebook({
    name: body.name,
    number: body.number
  })

  book.save().then(savedToPhonebook => {
    response.json(savedToPhonebook)
  })
})

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(
        `<p>Phonebook has info for ${persons.length} persons</p>
        <p>${date}</p>`
  )
})

app.get('/api/persons/:id', (request, response) => {
  Phonebook.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
