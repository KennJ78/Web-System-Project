const mongoose = require('mongoose')

const Schema = mongoose.Schema

const employeeschedSchema = new Schema({

  employeename: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  shiftfrom: {
    type: Object,
    required: true
  },
  shiftto: {
    type: Object,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Employeesched', employeeschedSchema)