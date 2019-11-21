import express from 'express';
import bodyParser from 'body-parser';
import database from './Database';
import config from '../config/config';
import BookController from '../src/book/BookController';
import Book from './book/Book';
import Author from './author/Author';
import Customer from './customer/Customer';
import BorrowingHistory from './borrowing-history/BorrowingHistory';
import BorrowingHistoryController from './borrowing-history/BorrowingHistoryController';

const app = express();
const db = database.connect(config.db);

const createModels = () => ({
  Book: Book.init(db),
  Author: Author.init(db),
  Customer: Customer.init(db),
  BorrowingHistory: BorrowingHistory.init(db)
});

const initializeAssociation = (models) => {
  models.Book.associate(models);
  models.Author.associate(models);
  models.Customer.associate(models);
};

const createControllers = () => [
  new BookController(app)
];

const initializeControllers = () => {
  const controllers = createControllers();
  controllers.forEach((controller) => {
    controller.registerRoutes();
  });
};

const registerDependencies = () => {
  app.locals.models = createModels();
};
const registerServices = (models) => {
  app.locals.services = createModels(models);
};

registerDependencies();
registerServices(app.locals.models);

app.use(bodyParser.json());
initializeControllers();

app.locals.models = createModels();

const bookController = new BookController(app);
const borrowingController = new BorrowingHistoryController(app);
bookController.registerRoutes();
borrowingController.registerRoutes();

initializeAssociation(app.locals.models);

export default app;
