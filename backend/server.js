const app=require('./app');

const connectDatabase = require('./config/database');



connectDatabase()

const server=app.listen(process.env.PORT,()=>{
    console.log(`server listen ${process.env.PORT} in  ${process.env.NODE_ENV}`)
})

process.on('unhandledRejection',(err)=>{
    console.log(`error: ${err.message}`)
    console.log(`shuting down the server due to unhandled Rejection`)
    server.close(()=>{
        process.exit(1)
    })
})

process.on('uncaughtException',(err)=>{
    console.log(`error: ${err.message}`)
    console.log(`shuting down the server due to uncaught exception`)
    server.close(()=>{
        process.exit(1)
    })
})





