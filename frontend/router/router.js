const express=require('express');
const router = express.Router();
const axios = require('axios')
require('dotenv').config();

const URL_BACKEND = process.env.URL_BACKEND || 'http://localhost:4040/'


router.get('/', async (req,res)=>{

    try {
        const respuesta = await axios.get(URL_BACKEND)
        const productos = respuesta.data.data
        res.render('pages/index',{
            productos:productos
        });
    } catch (error) {
        res.render('pages/error404',{
            message:'No se pudo conectar al backend'
        })
    }
})

router.post('/crearProducto', async (req,res)=>{
    try {
        const {referencia,nombre,descripcion,cantidad}=req.body

        const respuesta = axios.post(
            URL_BACKEND,
            {referencia,nombre,descripcion,cantidad}
        );
        res.redirect('/')
        
    } catch (error) {
        res.render('pages/error404',{
            message:'No se pudo crear el producto'
        })
    }

})

router.post('/actualizarProducto', async (req,res)=>{
    try {
        const id = req.body.id
        const {referencia,nombre,descripcion,cantidad}=req.body

        const respuesta = await axios.put(
            `${URL_BACKEND}${id}`,
            {referencia,nombre,descripcion,cantidad}
        );
        res.redirect('/')
    } catch (error) {
        res.render('pages/error404',{
            message:'Se presento un problema al actualizar el prodcuto'
        })
    }

})

router.post('/eliminarProducto', async (req,res)=>{
    try {
        const id = req.body.id
        const respuesta = await axios.delete(`${URL_BACKEND}${id}`);
        res.redirect('/')
    } catch (error) {
        res.render('pages/error404',{
            message:'Se presento un problema al elimianr el producto.'
        })
    }

})

module.exports = router;