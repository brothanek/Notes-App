const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const noteSchema = new Schema({
   // _id:{type: String, required: false},
    headline: { type: String, required: true},
    content: { type: String, required: true},
    date: { type: Date, required: true}
}, {
    timestamps: true
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note
