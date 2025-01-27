import express, { Request, Response } from "express"
import path from "path";
import mysql from "mysql";


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
    console.log("Сервер поехал");
});
