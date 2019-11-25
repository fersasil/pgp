const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');


const app = express();

//Middlewares
app.use(bodyParser.json());
app.use(cors());

//Rotas
app.use('/api/', authRoutes);
app.use('/api/', userRoutes);
app.use('/api/', eventRoutes);

//Qr codes
app.use('/static', express.static(path.join(__dirname, 'public')))


//192.168.0.104
//const server = "192.168.0.105";
const server = "localhost";

app.listen(3000, server, _ => {
    console.log(`Server is listening at http://${server}:3000`);
});