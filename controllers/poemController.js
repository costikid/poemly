const Poem = require('../models/poem');
const mongoose = require('mongoose');

exports.getAllPoems = async (req, res) => {
  const userId = req.user.userId; 

  try {
    const poems = await Poem.find({ user: userId }, 'title content writtenDate');
    res.json(poems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPoemById = async (req, res) => {
  const { id } = req.params;
  try {
    const poem = await Poem.findById(id);
    if (!poem) {
      return res.status(404).json({ message: 'Poem not found' });
    }
    res.json(poem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createPoem = async (req, res) => {
  const { title, content, writtenDate, categories } = req.body;
  const userId = req.user.userId;

  try {
    const newPoem = new Poem({
      title,
      content,
      writtenDate,
      categories, 
      user: userId,
    });

    await newPoem.save();
    res.status(201).json(newPoem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updatePoem = async (req, res) => {
  const { id } = req.params;
  const { title, content, writtenDate, categories } = req.body;

  try {
    const poem = await Poem.findById(id);
    if (!poem) {
      return res.status(404).json({ message: 'Poem not found' });
    }
    if (poem.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    const updatedFields = {
      title,
      content,
      writtenDate,
      categories, 
    };
    const updatedPoem = await Poem.findByIdAndUpdate(id, updatedFields, { new: true });
    res.json(updatedPoem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deletePoem = async (req, res) => {
  const { id } = req.params;
  try {
    const poem = await Poem.findById(id);
    if (!poem) {
      return res.status(404).json({ message: 'Poem not found' });
    }
    if (poem.owner !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await Poem.findByIdAndDelete(id);
    res.json({ message: 'Poem deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getWrittenDate = async (req, res) => {
  const { id } = req.params;
  try {
    const poem = await Poem.findById(id);
    if (!poem) {
      return res.status(404).json({ message: 'Poem not found' });
    }
    res.json({ writtenDate: poem.writtenDate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPoemsByUserId = async (req, res) => {
  const userId = req.params.userId;
  const authenticatedUserId = req.user.userId;

  if (userId !== authenticatedUserId) {
    return res.status(403).json({ message: 'Forbidden: You can only access your own poems' });
  }

  try {
    const poems = await Poem.find({ user: userId }, 'title content writtenDate');
    res.json(poems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};