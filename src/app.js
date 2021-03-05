import express from 'express';
import bodyParser from 'body-parser';
import InstagramService from './instagram/InstagramService';
import InstagramController from './instagram/InstagramController';

const app = express();
// const db = database.connect(config.db);

const createModels = () => ({
});

const createServices = models => ({
  instagramService: new InstagramService(models)
});

// const initializeAssociation = (models) => {
//   models.SomeFeature.associate(models);
// };

const createControllers = () => [
  new InstagramController(app)
];

const initializeControllers = () => {
  const controllers = createControllers();
  controllers.forEach((controller) => {
    controller.registerRoutes();
  });
};

const registerDependencies = () => {
  app.locals.models = createModels();
  app.locals.services = createServices(app.locals.models);
};

registerDependencies();

app.use(bodyParser.json());
initializeControllers();

// initializeAssociation(app.locals.models);

export default app;
