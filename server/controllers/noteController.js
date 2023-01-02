const asyncHandler = require('express-async-handler');

const Note = require('../schemas/noteModel');

// @desc Get Notes
// @route GET /api/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find();
    res.status(200).json(notes);
});

// @desc SET Note
// @route POST /api/notes
// @access Private
const setNote = asyncHandler(async (req, res) => {
    if (!req.body.note) {
        res.status(400);
        throw new Error('Please add note field');
    }

    const note = await Note.create({
        note: req.body.note
    });

    res.status(200).json(note);
});

// @desc UPDATE Note
// @route PUT /api/notes/:id
// @access Private
const updateNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (!note) {
        res.status(400);
        throw new Error('Note not found');
    }

    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });

    res.status(200).json(updatedNote);
});

// @desc DELETE Note
// @route DELETE /api/notes/:id
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (!note) {
        res.status(400);
        throw new Error('Note not found');
    }

    await note.remove();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getNotes,
    setNote,
    updateNote,
    deleteNote
};
