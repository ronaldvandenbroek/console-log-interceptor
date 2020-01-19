const express = require('express');
const cors = require('cors');

class Server {
    public server;

    constructor() {
        this.server = express();
        this.server.use(express.json())
        this.configureCORS();
        this.mountRoutes();
    }

    private configureCORS(): void {
        this.server.use(cors());
        var whitelist = ['http://localhost:4200']
        var corsOptions = {
            origin: function (origin, callback) {
                if (whitelist.indexOf(origin) !== -1) {
                    callback(null, true)
                } else {
                    callback(new Error('Not allowed by CORS'))
                }
            }
        }
        this.server.use(cors(corsOptions));
    }

    private mountRoutes(): void {
        this.server.post('/log', function (request, response) {
            const body = request.body['0'];
            console.log(body);
            response.status(200).send();
        })
    }
}

export default new Server().server