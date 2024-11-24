const mongoose = require('mongoose')

const Schema = mongoose.Schema

const employeeSchema = new Schema({
  ecode: {
    type: Object,
    required: true
  },
  employeename: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Employee', employeeSchema)