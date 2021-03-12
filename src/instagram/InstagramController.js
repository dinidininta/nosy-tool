import express from 'express';


export default class InstagramController {
  constructor(app) {
    this._app = app;
    this._router = express.Router();
    this._getProfile = this._getProfile.bind(this);
    this._getUserByUsername = this._getUserByUsername.bind(this);
  }

  registerRoutes() {
    this._app.use('/instagram', this._router);
    this._router.get('/profile', this._getProfile);
    this._router.post('/user', this._getUserByUsername);
  }

  async _getProfile(req, res) {
    const { instagramService } = this._app.locals.services;
    const result = await instagramService.getProfile();
    return res.status(200).json(result);
  }

  async _getUserByUsername(req, res) {
    const { instagramService } = this._app.locals.services;
    const result = await instagramService.getUserByUsername(req.body);
    return res.status(200).json(result);
  }
}
