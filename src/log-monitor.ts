/* eslint no-unused-vars:
  ["error", { "varsIgnorePattern": "http" }] */
import express = require('express');
import cors = require('cors');
import http = require('http');

/**
 * Callback interface used to return the intercepted log entry.
 */
export interface IMonitorCallback {
  (log: string): void;
}

/**
 * Server class used to recieve intercepted logs.
 */
export class LogMonitor {
  private logMonitor: express.Application;
  public server: http.Server;
  private callback: IMonitorCallback;

  /**
   * Setup the express server.
   * @param  {IMonitorCallback} callback
   * @param  {string[]} whitelist
   * @param  {number} port
   */
  constructor(callback: IMonitorCallback, whitelist: string[], port: number) {
    this.callback = callback;
    this.setupExpress(port);
    this.configureCORS(whitelist);
    this.mountRoutes(callback);
    this.callback(`Server started on port ${port}`);
  }

  /**
   * Setup the express server.
   * @param  {number} port
   */
  private setupExpress(port: number) {
    this.logMonitor = express();
    this.logMonitor.use(express.json());
    this.server = this.logMonitor.listen(port);
  }

  /**
   * Configure the CORS of the express server.
   * @param  {string[]} whitelist
   */
  private configureCORS(whitelist: string[]): void {
    if (whitelist) {
      const corsOptions: cors.CorsOptions = {
        origin: whitelist,
        methods: 'POST',
      };

      this.logMonitor.use(cors(corsOptions));
    }
  }

  /**
   * Configuring the routes the express server can be called on.
   * @param  {IMonitorCallback} callback
   */
  private mountRoutes(callback: IMonitorCallback): void {
    this.logMonitor.post('/log', function(request, response) {
      const body = request.body['0'];
      callback(body);
      response.status(200).send();
    });
  }

  /**
   * Stop the express server.
   */
  public stop() {
    // this.callback('Closing server');
    this.server.close();
  }
}
