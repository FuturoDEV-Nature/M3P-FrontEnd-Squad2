const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('database.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.get('/locais', (req, res) => {
  const userId = req.query.userId; 
  const db = router.db;

  if (userId) {
    const locais = db.get('locais').filter({ userId }).value();
    res.jsonp(locais);
  } else {
    res.jsonp(db.get('locais').value());
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
