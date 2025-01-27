import express, { Request, Response } from "express"
import path from "path";
import mysql from "mysql";


const connection = mysql.createConnection({
  port: 5444,
  host: "localhost",
  user: "test",
  database: "public",
  password: "test",
}); 

 connection.connect(err =>{
    if (err) {
      return console.error("Server Clfame error: " + err.message);
    }
    else{
      console.log("Подключение успешно установлено");
    }
 });
//connection.query("SELECT * FROM users",
   // function(err:Error) {
   //   console.log(err.message); 
 // });
 // const sql = "INSERT INTO users(user, password) VALUES(demo, demo)";


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
    console.log("Сервер поехал");
});
