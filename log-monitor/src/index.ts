import logServer from './log-server';

console.log(`Starting LogServer`);
const port = process.env.PORT || 8888;

logServer.listen(port, function(error) {
  if (error) {
    throw error;
  }
  console.log(`Server started on port ${port}`);
});
