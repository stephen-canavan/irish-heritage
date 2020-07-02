module.exports = (app) => {

    const heritageSite = require('../controllers/heritageSite.controllers.js');

    app.post('/heritageSites', heritageSite.create);
    app.get('/heritageSites', heritageSite.findAll);
    app.get('/heritageSites/:id', heritageSite.findOne);
    app.put('/heritageSites/:id', heritageSite.update);
    app.delete('/heritageSites/:id', heritageSite.delete);
}
