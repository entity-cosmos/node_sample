const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const Notes = mongoose.model("Notes", notesSchema);

module.exports = Notes;
