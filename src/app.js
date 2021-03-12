import express from 'express';
import bodyParser from 'body-parser';
import Instagram from 'instagram-web-api';
import InstagramService from './instagram/InstagramService';
import InstagramController from './instagram/InstagramController';

const { IG_USERNAME, IG_PASSWORD } = process.env;

const app = express();
// const db = database.connect(config.db);

const createModels = () => ({
});

const createServices = locals => ({
  instagramService: new InstagramService(locals)
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
  console.log('registering dependencies...');
  app.locals.models = createModels();
  app.locals.client = new Instagram({ username: IG_USERNAME, password: IG_PASSWORD });
  app.locals.services = createServices(app.locals);
};

registerDependencies();

app.locals.client.login().then((res) => { console.log(res); });

app.use(bodyParser.json());
initializeControllers();

// initializeAssociation(app.locals.models);

export default app;
