"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class IndexController {
    index(req, res) {
        res.json({ mesagge: 'API is in /api/products' });
    }
}
exports.indexController = new IndexController;
