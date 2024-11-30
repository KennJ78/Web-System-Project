const mongoose = require('mongoose')

const Schema = mongoose.Schema

const breadSchema = new Schema({
  bcode: {
    type: Object,
    required: true
  },
  breadname: {
    type: String,
    required: true
  },
  stocks: {
    type: Number, 
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Bread', breadSchema)