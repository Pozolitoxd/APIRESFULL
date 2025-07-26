const controllerProducts = require('../controllers/controller.products');
const express = require('express');
const router = express.Router();

router.get('/', controllerProducts.getProducts);
router.post('/', controllerProducts.insertProduct);
router.put('/:id',controllerProducts.updateProduct)
router.delete('/:id',controllerProducts.deleteProduct);
module.exports = router;
