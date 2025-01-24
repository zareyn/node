"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const store = {
    value: []
};
const server = (0, express_1.default)();
server.get('/store', (request, response) => {
    response.json(JSON.stringify(store));
    response.end();
});
server.get('/addToStore/:data', (request, response) => {
    const params = request.params;
    store.value.push(params.data);
    response.end();
});
server.get('/', (request, response) => {
    response.sendFile(path_1.default.resolve('./index.html'));
});
server.get('/v1/user/:id', (request, response) => {
    const params = request.params;
    const query = request.query;
    if (!query.name) {
        throw new Error();
    }
    const result = parseInt(params.id);
    const object = {
        name: "Саня",
        title: "Не спи",
        age: result + parseInt(query.name)
    };
    response.json(object);
});
server.listen(8080, () => {
    console.log("Сервер поехал");
});
//# sourceMappingURL=main.js.map