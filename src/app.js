import express from 'express';
import bodyParser from 'body-parser';
import database from './Database';
import config from '../config/index';
import SomeFeature from './some-feature/SomeFeature';
import SomeFeatureService from './some-feature/SomeFeatureService';
import SomeFeatureController from './some-feature/SomeFeatureController';

const app = express();
const db = database.connect(config.db);

const createModels = () => ({
  Feature: SomeFeature.init(db)
});

const createServices = (models) => ({
  someFeatureService: new SomeFeatureService(models)
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
  app.locals.services = createServices(models);
};

registerDependencies();

app.use(bodyParser.json());
initializeControllers();

initializeAssociation(app.locals.models);

export default app;
