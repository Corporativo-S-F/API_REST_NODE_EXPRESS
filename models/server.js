require('dotenv').config({path:"./vars/.env"});
const express = require('express')
const cors = require('cors')

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8080;

        this.usuariosRoutePath = '/api/usuarios';

        //middlewares
        this.middlewares();

        //rutas
        this.routes();
    }

    middlewares(){
        //cors
        this.app.use(cors());

        //lectura y parser del body
        this.app.use(express.json())

        //directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usuariosRoutePath, require('../routes/user.routes'))
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Corriendo en el puerto', this.port);
        });
    }
}

module.exports = Server;