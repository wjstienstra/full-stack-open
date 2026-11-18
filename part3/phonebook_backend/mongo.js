const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://wjstienstra_db_user:${password}@cluster0.zywj6sa.mongodb.net/phonebook`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const ContactsSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', ContactsSchema)

if (process.argv.length === 3) {
    Contact.find({}).then(result => {
        result.forEach(note => {
        console.log(note)
        mongoose.connection.close()
    })
    process.exit(1)
    
    })
}

if (process.argv.length > 3) {
    const contact = new Contact({
        name: process.argv[3],
        number: process.argv[4],
    })

    contact.save().then(result => {
    console.log(`Added ${contact.name} number ${contact.number} to phonebook`)
    mongoose.connection.close()
    })
}

