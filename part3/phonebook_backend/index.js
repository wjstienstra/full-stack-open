require('dotenv').config()
const Contact = require('./models/contact')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()


app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(morgan( (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req, res)
  ].join(' ')
}))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

//retrieve all persons in the phonebook
app.get('/api/persons', (request, response) => {
  Contact.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  response.send(`
        <p>Phonebook has info for ${Contact.length} people</p>
        <p>${new Date()}</p>
        `)
})

app.get('/api/persons/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// Delete a person from the phonebook
app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndDelete(request.params.id)
    .then(result => {
      console.log(result)
      console.log('deleted person with id:', request.params.id)
      response.status(204).end()
    })
    .catch(error => next(error))
})

// create a new person in the phonebook
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Contact({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Contact.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }
      person.name = name
      person.number = number

      return person.save()
        .then(updatedPerson => {
          response.json(updatedPerson)
        })
    })
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

