// models/studentmarks.js
// 2. Creating a Schema and Model i.e. collection called 'studentmarks' collection 
const mongoose = require('mongoose');

const studentMarksSchema = new mongoose.Schema({
  Name: String,
  Roll_No: Number,
  WAD_Marks: Number,
  CC_Marks: Number,
  DSBDA_Marks: Number,
  CNS_Marks: Number,
  AI_marks: Number
});

const StudentMarks = mongoose.model('StudentMarks', studentMarksSchema);

module.exports = StudentMarks;
