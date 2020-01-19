const express = require('express');
const cors = require('cors');

/**
 * Server class used to recieve intercepted logs.
 */
class Server {
  public server;

  /**
 * Setup the express server.
 */
  constructor() {
    this.server = express();
    this.server.use(express.json());
    this.configureCORS();
    this.mountRoutes();
  }

  /**
  * Configure the CORS of the express server.
  */
  private configureCORS(): void {
    this.server.use(cors());
    const whitelist = ['http://localhost:4200'];
    const corsOptions = {
      origin: function(origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    };
    this.server.use(cors(corsOptions));
  }

  /**
  * Configuring the routes the express server can be called on.
  */
  private mountRoutes(): void {
    this.server.post('/log', function(request, response) {
      const body = request.body['0'];
      console.log(body);
      response.status(200).send();
    });
  }
}

export default new Server().server;
