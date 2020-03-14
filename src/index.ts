import { ICallback, LogMonitor } from './log-monitor';

const port: string = process.env.PORT || '8888';
const whitelist: string[] = ['http://localhost:4200'];

let callback: ICallback = (log: string): void => {
  console.log(log);
}

new LogMonitor(callback, whitelist, port);
