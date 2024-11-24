const mongoose = require('mongoose')

const Schema = mongoose.Schema

const coffeeSchema = new Schema({
  ccode: {
    type: Object,
    required: true
  },
  coffeename: {
    type: String,
    required: true
  },
  stocks: {
    type: Number,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Coffee', coffeeSchema)