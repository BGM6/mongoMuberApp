const Driver = require('../models/driver');

module.exports = {
		greeting(req, res) {
				res.send({name: 'Bryan'});
		},
		create(req, res) {
				console.log(req.body);
				res.send({name: 'Bryan'});
		}
};
