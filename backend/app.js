const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');

const app = express();

//Middlewares
app.use(bodyParser.json());
app.use(cors());

//Rotas
app.use('/api/', authRoutes);


app.listen(3000, _ => {
    console.log('Server is listening at http://localhost:3000');
});