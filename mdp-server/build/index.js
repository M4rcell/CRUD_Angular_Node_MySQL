"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
//Routes
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
class Server {
    constructor() {
        //inicializando servidor
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        //ejecutar en puerto especifico o difinido
        this.app.set('port', process.env.port || 3000);
        //peticiones al url de API
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        /* this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false})); */
    }
    // configurar las rutas de mi servidor
    routes() {
        //inicializar route principal
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/products', productRoutes_1.default);
    }
    // ejecutar el servidor
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
//inicializar la aplicacion
const server = new Server();
server.start();
