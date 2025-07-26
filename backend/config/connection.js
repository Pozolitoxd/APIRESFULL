const mongoose = require('mongoose');
require('dotenv').config();

// Colocar base de datos creada en mongo y las variables de entorno

const URI = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASS_DB}@cluster0.xfphf.mongodb.net/${process.env.DB_NAME}`
             
mongoose.connect(URI);

module.exports = mongoose;