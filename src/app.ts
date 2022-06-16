import * as express from 'express';
import routes from './api/shop.route';

export class App {
    public express: express.Application;
    private routes: express.Router;

    constructor(routes: express.Router) {
        this.routes = routes;
    }

    init(port: string | number) {
        this.express = express();
        this.express.use('/api', this.routes);

        this.express.listen(port);
    }
}

export default new App(routes);