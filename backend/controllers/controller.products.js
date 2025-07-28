const Product = require('../models/model.products');
const configEmail = require('../services/email.service');
require('dotenv').config()

//funcion para el manejo de errores y no reutilizar codigo xd
function controllError(res,message,error){
    res.status(500).json({
        success: false,
        message:message,
        error:error.message
    })
}
const getProducts = async (req,res)=>{
    try {
        const productos = await Product.find();
            res.status(200).json({
                success: true,
                message:'Se obtuvieron los productos',
                data:productos
            })
            
            // Enviar email de notificación
            configEmail(
                process.env.EMAIL_USER,
                'estebantoro.p.7@gmail.com',
                'Productos obtenidos',
                `Se obtuvieron ${productos.length} productos exitosamente`
            );

    } catch (error) {
        controllError(res,'No se pudo encontrar productos debido a un error', error)
    }
};
const insertProduct = async (req,res)=>{

    try {
        const producto = {
            referencia: req.body.referencia,
            nombre: req.body.nombre,
            descripcion:req.body.descripcion,
            cantidad: req.body.cantidad
        }
        const createdProduct = await Product.create(producto);
        res.status(201).json({
            success:true,
            message:'Producto creado con exito!',
            data:createdProduct
        })
    } catch (error) {
        controllError(res,'No se pudo crear el producto',error)
    }
}
const updateProduct = async (req,res)=>{
    try {
        const id = req.params.id
        const nuevosDatos = req.body
        const productUpdate = await Product.findByIdAndUpdate(id,nuevosDatos,{new:true})

        if(!productUpdate)
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado"
              });
        else
            res.status(200).json({
                success:true,
                message:'Producto actualizado con exito',
                data:productUpdate
            })
    } catch (error) {
        controllError(res,'El prodcuto no se pudo actualizar',error)
    }
}
const deleteProduct = async (req,res)=>{
    try {
        const id = req.params.id
        const productDelete = await Product.findByIdAndDelete(id)

        if(!productDelete)
            return res.status(404).json({
                success:false,
                message:'El producto a eliminar no fue encontrado',
            });
        res.status(200).json({
            success: true,
            message:'El producto se eliminó con éxito',
            data: productDelete
        })  
    } catch (error) {
        controllError(res,'El producto no se pudo eliminar',error)
    }
}
module.exports={
    getProducts,
    insertProduct,
    updateProduct,
    deleteProduct
}