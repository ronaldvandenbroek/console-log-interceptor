import express = require('express');
import cors = require('cors');

/**
 * Server class used to recieve intercepted logs.
 */
class LogMonitor {
  public logMonitor;

  /**
 * Setup the express server.
 */
  constructor() {
    this.logMonitor = express();
    this.logMonitor.use(express.json());
    this.configureCORS();
    this.mountRoutes();
  }

  /**
  * Configure the CORS of the express server.
  */
  private configureCORS(): void {
    this.logMonitor.use(cors());
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
    this.logMonitor.use(cors(corsOptions));
  }

  /**
  * Configuring the routes the express server can be called on.
  */
  private mountRoutes(): void {
    this.logMonitor.post('/log', function(request, response) {
      const body = request.body['0'];
      console.log(body);
      response.status(200).send();
    });
  }
}

export default new LogMonitor().logMonitor;
