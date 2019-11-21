/* eslint no-console: 0 */
import Server from './src/Server';
import app from './src/app';
import config from './config/index';

const server = new Server(app, config);
server.start();
