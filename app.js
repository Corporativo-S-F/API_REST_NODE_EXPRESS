require('dotenv').config({path:"./vars/.env"});

const Server = require("./src/models/server");

const server = new Server()

server.listen();
