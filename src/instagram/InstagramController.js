import express from 'express';


export default class InstagramController {
  constructor(app) {
    this._app = app;
    this._router = express.Router();
  }

  registerRoutes() {
    this._app.use('/instagram', this._router);
  }
}
