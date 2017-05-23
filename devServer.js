const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const Webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const Config = require('./config/webpack/webpack.config.dev.js');
const server = new Hapi.Server({
  debug: {
    log: ['error']
  }
});
const host = 'localhost';
const port = 3000;
server.connection({
  host,
  port,
  routes: {
    cors: {
      origin: ['*']
    }
  }
});
server.register(Inert, () => {});

const compiler = Webpack(Config);
compiler.apply(new DashboardPlugin());

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  host,
  port,
  historyApiFallback: true,
  publicPath: Config.output.publicPath,
  quiet: true  // important for webpack-dashboard to work
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
});

server.ext('onRequest', (request, reply) => {
  devMiddleware(request.raw.req, request.raw.res, (err) => {
    if (err) {
      return reply(err);
    }

    reply.continue();
  });
});

server.ext('onRequest', (request, reply) => {
  hotMiddleware(request.raw.req, request.raw.res, (err) => {
    if (err) {
      return reply(err);
    }

    reply.continue();
  });
});

server.ext('onPreResponse', (request, reply) => {
  const lastModified = new Date();
  reply.file(Path.join(compiler.outputPath, 'index.html')).header('last-modified', lastModified.toUTCString());
});

server.route({
  method: 'GET',
  path: '/assets/{file*}',
  handler: {
    directory: {
      path:  compiler.outputPath,
      redirectToSlash: true,
      index: true
    }
  }
});

server.start((err) => {
  console.log('server started on: ', server.info.uri);


  if (err) {
    throw err;
  }
  console.log('server started on: ', compiler.outputPath);
});
