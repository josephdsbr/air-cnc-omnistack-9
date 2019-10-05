const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

mongoose.connect("mongodb+srv://josephds:Maisvc10@cluster0-y33pg.mongodb.net/omnistack?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, () => {console.log("Conectado ao banco de dados")})

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(4200, () =>  console.log("Running on port 4200"));