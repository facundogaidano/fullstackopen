import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number
  }
})

schema.plugin(uniqueValidator)

// module.exports = mongoose.model('Author', schema)
export default mongoose.model('Author', schema)
