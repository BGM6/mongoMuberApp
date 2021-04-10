const DriversController = require('../controllers/driversController');
module.exports = (app) => {
		app.get('/api', DriversController.greeting);

		app.post('/api/drivers', DriversController.create);
		app.put('/app/drivers/:id', DriversController.edit);
		app.delete('/app/drivers/:id', DriversController.delete);
		app.get('/api/drivers', DriversController.index);
};
