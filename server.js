require("dotenv").config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const portf = require("./port")
const URI=process.env.MONGO_URI;
mongoose.connect(URI);
const app = express();
app.use(cors()); 
app.use(bodyParser.json());
app.get("/",(req,res) =>{
    res.json("hello");
};
app.post('/addQuery', async (req, res) => {
    try {
      const { title, message } = req.body;
  
      // Check for required fields
      if (!title || !message) {
        return res.status(400).json({ error: 'Title and message are required' });
      }
  
      // Create and save new data
      const data = new portf({ title, message }); // Assuming `port` is the Mongoose model
      await data.save();
  
      // Send response
      res.status(201).json(data);
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: error.message }); // 500 Internal Server Error for general errors
    }
  });
app.get('/getQuery', async (req, res) => {
    let data = await portf.find();
    res.send(data);
})
 const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
