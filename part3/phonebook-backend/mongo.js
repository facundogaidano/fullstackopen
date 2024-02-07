const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://facundog:${password}@myfirstmongodb.bjxxkjp.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Book = mongoose.model('Book', phonebookSchema)

if (process.argv.length === 3) {
  Book
    .find({})
    .then(persons => {
      persons.forEach(person => {
        console.log(person)
      })
      mongoose.connection.close()
    })
} else if (process.argv.length < 5) {
  console.log('missing arguments: node mongo.js {password} {"name"} {number}')
  process.exit(1)
} else {
  const book = new Book({
    name: process.argv[3],
    number: process.argv[4]
  })

  book.save().then(result => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
  })
}
