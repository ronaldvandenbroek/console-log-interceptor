import server from './Server';

const port = process.env.PORT || 8888;

server.listen(port, function (error) {
  if (error) {
    throw error;
  }
  console.log(`Server started on port ${port}`);
});
