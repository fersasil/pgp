const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

//Middlewares
app.use(bodyParser.json());
app.use(cors());

//Rotas
app.use('/api/', authRoutes);
app.use('/api/', userRoutes);

//Qr codes
app.use('/static', express.static(path.join(__dirname, 'public')))



app.listen(3000, _ => {
    console.log('Server is listening at http://localhost:3000');
});