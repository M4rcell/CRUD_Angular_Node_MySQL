import { Request, Response } from 'express';


import conexion  from '../database';

class ProductsController {

    public async listProduct(req: Request, res: Response): Promise<void> {
        const product = await conexion.query('SELECT * FROM products');
        res.json(product);
    }
    public async listCategories(req: Request, res: Response): Promise<void> {
        const category = await conexion.query('SELECT * FROM categories');
        res.json(category);
    }

    public async getOneProduct(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const product = await conexion.query('SELECT * FROM products WHERE id = ?', [id]);
        console.log(product.length);
        if (product.length > 0) {
            return res.json(product[0]);
        }
        res.status(404).json({ text: "The products doesn't exits" });
    }

    public async createProduct(req: Request, res: Response): Promise<void> {
        const result = await conexion.query('INSERT INTO products set ?', [req.body]);
        res.json({ message: 'product Saved' });
    }

    public async updateProduct(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldProduct = req.body;
        await conexion.query('UPDATE products set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "The product was Updated" });
    }

    public async deleteProduct(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await conexion.query('DELETE FROM products WHERE id = ?', [id]);
        res.json({ message: "The product was deleted" });
    }
}

const productsController = new ProductsController;
export default productsController;