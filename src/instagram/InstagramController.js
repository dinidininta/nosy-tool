import express from 'express';


export default class InstagramController {
  constructor(app) {
    this._app = app;
    this._router = express.Router();
    this._getProfile = this._getProfile.bind(this);
    this._getUserByUsername = this._getUserByUsername.bind(this);
    this._getAllFollowingsOfUser = this._getAllFollowingsOfUser.bind(this);
  }

  registerRoutes() {
    this._app.use('/instagram', this._router);
    this._router.get('/profile', this._getProfile);
    this._router.get('/user/:username', this._getUserByUsername);
    this._router.post('/user/:username/followings', this._getAllFollowingsOfUser);
  }

  async _getProfile(req, res) {
    const { instagramService } = this._app.locals.services;
    const result = await instagramService.getProfile();
    return res.status(200).json(result);
  }

  async _getUserByUsername(req, res) {
    const { instagramService } = this._app.locals.services;
    const result = await instagramService.getUserByUsername(req.params);
    return res.status(200).json(result);
  }

  async _getAllFollowingsOfUser(req, res) {
    const result = [];
    const { verifiedAccOnly } = req.body;
    const { instagramService } = this._app.locals.services;
    const { id: userId } = await instagramService.getUserByUsername(req.params);
    await instagramService.collectFollowingsNames(userId, verifiedAccOnly, result);
    return res.status(200).json(result);
  }
}
