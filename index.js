const express = require('express');
const connectDB = require('./config/db')
const dotenv = require('dotenv'); 
const app = express();
const productRoutes = require('./routes/productRoutes.js');
dotenv.config(); 

const port = process.env.PORT || 3000; 

connectDB();
app.use(express.json()); 
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api', productRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});