const mongoose = require('mongoose');

const poemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  writtenDate: { type: Date, required: true, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  categories: [{ type: String, enum: ['happy', 'sad', 'inspired', 'angry', 'calm'] }] 

});

module.exports = mongoose.model('Poem', poemSchema);
