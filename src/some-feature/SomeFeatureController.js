import express from 'express';
import SomeFeature from './SomeFeature';

/**
 * Representing a controller ..
 */
export default class BookController {
  constructor(app) {
    this._app = app;
    this._router = express.Router();
    this._getFeatures = this._getFeatures.bind(this);
  }

  registerRoutes() {
    this._app.use('/plurals', this._router);
    this._router.get('/', this._getFeatures);
  }

  async _getFeatures(req, res) {
    const { Book } = this._app.locals.models;
    const result = await Book.findAll({ include: SomeFeature });
    return res.json(result);
  }
}
