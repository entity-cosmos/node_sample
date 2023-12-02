import express from 'express';
const router = express.Router();
import Notes from '../models/notes.js';

//create notes
router.post("/create", async(req, res) => {
  try{
    const date = new Date();
    const note = new Notes({
      title: req.body.title,
      content: req.body.content,
      date: date
    });
    console.log(note);
    const savedNote = await note.save();
    res.json(savedNote);
  }
  catch(err){
    res.status(500).json({message: err.message});
  }
});

//update notes
router.patch("/update/:id", async(req, res) => {
  try{
    const updatedNote = await Notes.updateOne(
      {_id: req.params.id},
      {$set: {title: req.body.title, content: req.body.content}}
    );
    res.json(updatedNote);
  }
  catch(err){
    res.status(500).json({message: err.message});
  }
});

//delete notes
router.delete("/delete/:id", async(req, res) => {
  try{
    const deletedNote = await Notes.deleteOne({_id: req.params.id});
    res.json(deletedNote);
  }
  catch(err){
    res.status(500).json({message: err.message});
  }
});

//list notes
router.get("/list", async(req, res) => {
    try{
        const notes = await Notes.find();
        res.json(notes);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

export default router;