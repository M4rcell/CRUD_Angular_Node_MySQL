
import express,{Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';

//Routes
import indexRoutes from './routes/indexRoutes';
import productRoutes from './routes/productRoutes';

class Server{
    public app: Application;
    constructor(){
       //inicializando servidor
       this.app =  express();
       this.config();
       this.routes();
    }
    config(): void{
        //ejecutar en puerto especifico o difinido
        this.app.set('port', process.env.port || 3000)
        //peticiones al url de API
        this.app.use(morgan('dev'));
        this.app.use(cors());
        /* this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false})); */

    }
    // configurar las rutas de mi servidor
    routes():void {
        //inicializar route principal
        this.app.use(indexRoutes)
        this.app.use('/api/products', productRoutes);


    }
    // ejecutar el servidor
    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));

        });

    }



}
//inicializar la aplicacion
const server = new Server();
server.start();