"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class ProductsController {
    listProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield database_1.default.query('SELECT * FROM products');
            res.json(product);
        });
    }
    listCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield database_1.default.query('SELECT * FROM categories');
            res.json(category);
        });
    }
    getOneProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const product = yield database_1.default.query('SELECT * FROM products WHERE id = ?', [id]);
            console.log(product.length);
            if (product.length > 0) {
                return res.json(product[0]);
            }
            res.status(404).json({ text: "The products doesn't exits" });
        });
    }
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('INSERT INTO products set ?', [req.body]);
            res.json({ message: 'product Saved' });
        });
    }
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const oldProduct = req.body;
            yield database_1.default.query('UPDATE products set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "The product was Updated" });
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM products WHERE id = ?', [id]);
            res.json({ message: "The product was deleted" });
        });
    }
}
const productsController = new ProductsController;
exports.default = productsController;
