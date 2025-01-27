import express, { Request, Response } from "express"
import { connect } from "http2";
//import { Pool } from "mysql2/typings/mysql/lib/Pool";
import path from "path";
//import mysql from "mysql";
import pg, { Client } from 'pg';
 
const connection = new pg.Client({
  port: 5444,
  user: 'test',
  password: 'test',
  host: 'localhost',
  database: 'test',
})

//const connection = mysql.createConnection({
//  port: 5444,
//  host: "localhost",
//  user: "test",
//  database: "test",
//  password: "test",
//}); 

  connection.connect(err =>{
    if (err) {
     return console.error("- ☺ Server Clfame error: " + err.message);
    }
    else{
      console.log("+ ☺ Server Clfame connect");
    }
});
  connection.query("SELECT * FROM public.users", 
    (err:Error) => { if (err){
     console.log("- ☺ file users Clfame error: " + err.message)}else
    {console.log("+ ☺ file users Clfame connect")}});
 connection.query("INSERT INTO public.users (nameuser, password) VALUES ('demo','demo');",
     (err:Error) => {if (err){
    console.log("- ☺ INSERT users Clfame error: " + err.message)}else{
    console.log("+ ☺ INSERT users Clfame complite")
    console.log("+ ☺"+ connection.query("SELECT * FROM public.users"));}});

const store: { value: any[] } = {
    value: []
};

const server = express();

server.get('/store', (request: Request, response: Response) => {
    response.json(JSON.stringify(store));
    response.end();
})

server.get('/addToStore/:data', (request: Request, response: Response) => {
    const params = request.params as { data: string };
    store.value.push(params.data)
    response.end();
})

server.get('/', (request: Request, response: Response) => {
    response.sendFile(path.resolve('./index.html'));
});

server.get('/v1/user/:id', (request: Request, response: Response) => {
    const params = request.params as { id: string };
    const query = request.query as { name: string };

    if(!query.name) {
        throw new Error();
    }

    const result = parseInt(params.id);

    const object = {
        name: "Саня",
        title: "Не спи",
        age: result + parseInt(query.name)
    }

    response.json(object);
})

server.listen(8080, () => {
    console.log("+ ☺ run server Clfame");
});
