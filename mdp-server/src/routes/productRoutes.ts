
import express, { Router } from 'express';

import productsController from '../controllers/productController';

class ProductRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', productsController.listProduct);
        this.router.get('/category', productsController.listCategories);
        this.router.get('/:id', productsController.getOneProduct);
        this.router.post('/', productsController.createProduct);
        this.router.put('/:id', productsController.updateProduct);
        this.router.delete('/:id', productsController.deleteProduct);
        
    }

}

export default new ProductRoutes().router;
