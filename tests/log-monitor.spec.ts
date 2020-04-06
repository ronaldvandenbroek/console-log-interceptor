// TODO: Add Supertest to test the running server.
import { equal } from "assert";
import { IMonitorCallback, LogMonitor } from '../src/log-monitor';

describe("Log monitor testing suite", () => {
    it("should return expected string as startup confirmation", () => {
        const callback: IMonitorCallback = (log: string): void => {
            equal('Server started on port 8888', log)
        }
        const logMonitor: LogMonitor = new LogMonitor(callback, ['http://localhost:4200'], 8888);
        logMonitor.stop();
    });
});

