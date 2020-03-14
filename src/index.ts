import logMonitor from './log-monitor';

console.log(`Starting LogServer`);
const port = process.env.PORT || 8888;

logMonitor.listen(port, function(error) {
  if (error) {
    throw error;
  }
  console.log(`Server started on port ${port}`);
});
