const mongoose = require('mongoose');

const dbConnection = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB,{
            useNewUrlParser:true,
            useUnifiedTopology: true
        })
        console.log('base de datos conectada')
    }catch(err){
        console.log(err)
        throw new Error('Error en la conección a Mongo')
    }
}


module.exports={
    dbConnection
}