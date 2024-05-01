// index.js
//1. CONNECTING TO MONGODB
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/student', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// index.js
//3. Insert an array of documents into the 'studentmarks' collection.
const StudentMarks = require('./models/studentmarks');

const students = [
  { Name: 'ABC', Roll_No: 111, WAD_Marks: 25, CC_Marks: 25, DSBDA_Marks: 25, CNS_Marks: 25, AI_marks: 25 },
  { Name: 'Atharv', Roll_No: 54, WAD_Marks: 67, CC_Marks: 43, DSBDA_Marks: 36, CNS_Marks: 90, AI_marks: 24 },
  { Name: 'Manish', Roll_No: 8, WAD_Marks: 70, CC_Marks: 56, DSBDA_Marks: 45, CNS_Marks: 67, AI_marks: 88 },
  { Name: 'Harsh', Roll_No: 35, WAD_Marks: 54, CC_Marks: 67, DSBDA_Marks: 89, CNS_Marks: 23, AI_marks: 65 },
  { Name: 'Dhiraj', Roll_No: 83, WAD_Marks: 55, CC_Marks: 90, DSBDA_Marks: 83, CNS_Marks: 78, AI_marks: 58 },
  // Add more students as needed

];

// Insert documents into the collection
StudentMarks.insertMany(students)
  .then(() => console.log('Documents inserted'))
  .catch(err => console.error(err));


// index.js
//4. Listing total count of documents and list of it
app.get('/total-count', async (req, res) => {
    try {
      const totalCount = await StudentMarks.countDocuments();
      res.send(`Total count of documents: ${totalCount}`);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  app.get('/list-documents', async (req, res) => {
    try {
      const documents = await StudentMarks.find();
      res.json(documents);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });


// index.js
// 5. Listing students who have > 20 marks in dbms
app.get('/dsbda-marks', async (req, res) => {
    try {
      const students = await StudentMarks.find({ DSBDA_Marks: { $gt: 20 } }, 'Name');
      res.json(students);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  

// index.js
// 6. updating all marks by 10 of student : name
app.put('/update-marks/:name', async (req, res) => {
    const { name } = req.params;
    try {
      await StudentMarks.updateMany(
        { Name: name },
        { $inc: { WAD_Marks: 10, CC_Marks: 10, DSBDA_Marks: 10, CNS_Marks: 10, AI_marks: 10 } }
      );
      res.send(`Marks updated for ${name}`);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  

// index.js
// 7. Listing Students with > 25 Marks in All Subjects
app.get('/all-subjects-marks', async (req, res) => {
    try {
      const students = await StudentMarks.find({
        WAD_Marks: { $gt: 25 },
        CC_Marks: { $gt: 25 },
        DSBDA_Marks: { $gt: 25 },
        CNS_Marks: { $gt: 25 },
        AI_marks: { $gt: 25 }
      }, 'Name');
      res.json(students);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });


// index.js
// 8. Listing Students with < 40 Marks in Maths and Science:
app.get('/low-maths-science', async (req, res) => {
    try {
      const students = await StudentMarks.find({
        $and: [
          { WAD_Marks: { $lt: 40 } },
          { CC_Marks: { $lt: 40 } }
        ]
      }, 'Name');
      res.json(students);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });


// index.js
// 9. Removing Specified Student Document: name
app.delete('/remove-student/:name', async (req, res) => {
    const { name } = req.params;
    try {
      await StudentMarks.deleteOne({ Name: name });
      res.send(`Document for ${name} removed`);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  

// 10. Displaying data in table on browser
// index.js
app.get('/students-table', async (req, res) => {
    try {
      const students = await StudentMarks.find({}, '-_id Name Roll_No WAD_Marks DSBDA_Marks CNS_Marks CC_Marks AI_marks');
      let tableHTML = '<table border="1"><tr><th>Name</th><th>Roll No</th><th>WAD</th><th>DSBDA</th><th>CNS</th><th>CC</th><th>AI</th></tr>';
      students.forEach(student => {
        tableHTML += `<tr><td>${student.Name}</td><td>${student.Roll_No}</td><td>${student.WAD_Marks}</td><td>${student.DSBDA_Marks}</td><td>${student.CNS_Marks}</td><td>${student.CC_Marks}</td><td>${student.AI_marks}</td></tr>`;
      });
      tableHTML += '</table>';
      res.send(tableHTML);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  
  
  