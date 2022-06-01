const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8080;

        this.usuariosRoutePath = '/api/usuarios';
        this.rolesRoutePath = '/api/roles';

        //conectar a base de datos
        this.conectarDB()

        //middlewares
        this.middlewares();

        //rutas
        this.routes();
    }

    async conectarDB(){
        await dbConnection()
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
        this.app.use(this.usuariosRoutePath, require('../routes/user.routes')),
        this.app.use(this.rolesRoutePath, require('../routes/rol.routes'))
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Corriendo en el puerto', this.port);
        });
    }
}

module.exports = Server;