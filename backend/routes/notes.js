const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');

//Rout 1/4 >>> Get all notes endpoint ........ /api/notes/usernotes
router.get('/fetchnotes', fetchUser, async (req, res) => {

    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

//Rout 2/4 >>> Add new note endpoint ........ /api/notes/usernotes
router.post('/addnote', fetchUser, [
    body('title').isLength({ min: 1 }),
    body('description').isLength({ min: 1 })
], async (req, res) => {
    const { title, description, tag } = req.body;
    const tagsArray = tag.split(" ");
    //Checking for bad inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const note = new Notes({
            title, description, tag: tagsArray , user: req.user.id
        })
        console.log(tagsArray);
        const saveNote = await note.save();
        res.json(saveNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})


//Rout 3/4 >>> Update note endpoint ........ /api/notes/updatenote
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    //create new note
    const newNote = {};
    try {
        if (title) { newNote.title = title };
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        let note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Not Found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        //Get id of the note to be updated and update the fields in mongodb
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})


//Rout 4/4 >>> Update note endpoint ........ /api/notes/deletenote
router.delete('/deletenote/:id', fetchUser, async (req, res) => {

    try {
        //Get note id
        let note = await Notes.findById(req.params.id);

        //Check if it exists
        if (!note) {
            return res.status(404).send("Not Found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        };
        
        //Delete from the database
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted" });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }

})




module.exports = router;