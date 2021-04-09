const driversController = require('../controllers/driversController');
module.exports = (app) => {
		app.get('/api', driversController.greeting);
};
