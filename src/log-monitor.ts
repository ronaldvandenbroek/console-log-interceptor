import express = require('express');
import cors = require('cors');

/**
 * Callback interface used to return the intercepted log entry
 */
export interface ICallback {
  (log: string): void;
}

/**
 * Server class used to recieve intercepted logs.
 */
export class LogMonitor {
  private logMonitor;

  /**
 * Setup the express server.
 */
  constructor(callback: ICallback, whitelist: string[], port: string) {
    this.logMonitor = express();
    this.logMonitor.use(express.json());
    this.configureCORS(whitelist);
    this.mountRoutes(callback);
    this.logMonitor.listen(port)
    callback(`Server started on port ${port}`)
  }

  /**
  * Configure the CORS of the express server.
  */
  private configureCORS(whitelist: string[]): void {
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
  private mountRoutes(callback: ICallback): void {
    this.logMonitor.post('/log', function(request, response) {
      const body = request.body['0'];
      callback(body);
      response.status(200).send();
    });
  }
}
