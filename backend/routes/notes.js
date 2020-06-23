const router = require('express').Router()
let Note = require('../models/note.model')

//get all notes
router.get('/', async (req, res) => {
    try {
        let notes = await Note.find()
        res.json(notes)
    } catch (err) {
        res.status(400).json(`Error: ${err}`)
    }
})

// get note by id
router.get('/:id', async (req, res) => {
    try {
        let note = await Note.findById(req.params.id)
        //console.log(req.params.id)
        res.json(note)
    } catch (err) {
        res.status(400).json(`Error: ${err}`)
    }
})


// post notes - add
router.post('/add', async (req, res) => {
    //const _id = req.body._id
    const headline = req.body.headline
    const content = req.body.content
    const date = Date.parse(req.body.date)


    const newNote = new Note({
        //_id,
        headline,
        content,
        date
    })
    try {
        await newNote.save()
        res.json({ msg: 'Note added' })
    } catch (err) {
        res.status(400).json(`Error: ${err}`)
    }
})

//update notes by id
router.put('/update/:id', async (req, res) => {
    try {
        let note = await Note.findById(req.params.id)
        let newNote = req.body

        note.headline = newNote.headline ? newNote.headline : note.headline
        note.content = newNote.content ? newNote.content : note.content
        note.date = newNote.date ? newNote.date : note.date
        await note.save()
        res.json({ msg: `Excercise updated!`,note })
    } catch (err) {
        res.status(400).json(`Error: ${err}`)
    }
})

//delete note by id
router.delete('/delete/:id', async (req, res) => {
    try {
        let note = await Note.findById(req.params.id)
        note.deleteOne()
        res.json({ msg: "Note deleted!", note })
    } catch (err) {
        res.status(400).json(`Error: ${err}`)
    }
})

module.exports = router


