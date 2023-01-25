const {Client} = require('pg');
const client = new  Client({
    host: "localhost",
    port:'5432',
    user : 'postgres',
    password:'rohit',
    database:'SuperMart_DB'
})


client.on("connect",()=>{
    console.log("Database connected");
})

client.on("end",()=>{
    console.log("Database end");
})

module.exports=client;

