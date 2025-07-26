const express = require('express');
require('dotenv').config();

//llamado de la conneccion de la base de datos
require('./config/connection')

//llamado del router de los productos
const routerProducts = require('./router/router.products')

const app = express();
const PORT = process.env.PORT || 4040;

// definicion de los middleware para el manejo de las peticiones y 
// las respuestas en formato JSON y objetos complejos enviados por formularios HTML
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const morgan = require('morgan');
app.use(morgan('dev'));

app.use('/', routerProducts);


app.listen(PORT, () => {
    console.log(`🚀 El servidor está funcionando en el puerto ${PORT}`);
});

