const express = require('express')
const app = express()
require('dotenv').config();
const PORT = process.env.PORT || 5050
const path = require('path')
const routerFrontend = require('./router/router')
// configuracion para que express sepa cual es el motor de las vistas
app.set('view engine', 'ejs')

// configuracion para definir como se llama la carpeta donde estan las views
app.set('views',path.join(__dirname,'views'))

// configuracion pra datos estaticos
app.use(express.static(path.join(__dirname,'static')))

// definicion de los middleware para el manejo de las peticiones y 
// las respuestas en formato JSON y objetos complejos enviados por formularios HTML
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',routerFrontend);


app.listen(PORT,()=>{
    console.log('🚀 Servidor funcionando en el puerto: ',PORT)
})

