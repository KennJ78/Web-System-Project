const mongoose = require('mongoose')

const Schema = mongoose.Schema

const pastrySchema = new Schema({
  pcode: {
    type: Object,
    required: true
  },
  pastryname: {
    type: String,
    required: true
  },
  stocks: {
    type: Number,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Pastry', pastrySchema)