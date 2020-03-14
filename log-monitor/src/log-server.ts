import express = require('express');
import cors = require('cors');

/**
 * Server class used to recieve intercepted logs.
 */
class LogServer {
  public logServer;

  /**
 * Setup the express server.
 */
  constructor() {
    this.logServer = express();
    this.logServer.use(express.json());
    this.configureCORS();
    this.mountRoutes();
  }

  /**
  * Configure the CORS of the express server.
  */
  private configureCORS(): void {
    this.logServer.use(cors());
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
    this.logServer.use(cors(corsOptions));
  }

  /**
  * Configuring the routes the express server can be called on.
  */
  private mountRoutes(): void {
    this.logServer.post('/log', function(request, response) {
      const body = request.body['0'];
      console.log(body);
      response.status(200).send();
    });
  }
}

export default new LogServer().logServer;
