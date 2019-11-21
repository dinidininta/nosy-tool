import express from 'express';
import bodyParser from 'body-parser';
import database from './Database';
import config from '../config/index';
import SomeFeature from './some-feature/SomeFeature';
import SomeFeatureController from './some-feature/SomeFeatureController';

const app = express();
const db = database.connect(config.db);

const createModels = () => ({
  Feature: SomeFeature.init(db),
});

const initializeAssociation = (models) => {
  models.SomeFeature.associate(models);
};

const createControllers = () => [
  new SomeFeatureController(app)
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
