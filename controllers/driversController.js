const Driver = require('../models/driver');
module.exports = {
		greeting(req, res) {
				res.send({name: 'Bryan'});
		},
		create(err, req, res, next) {
				const driverProps = req.body;

				Driver.create(driverProps)
				.then(driver => res.send(driver))
				.catch(next);
		},
		edit(req, res, next) {
			const driverId = req.params.id;
			const driverProps = req.body;

			Driver.findByIdAndUpdate({id: driverId}, driverProps)
				.then(() => Driver.findById({id: driverId}))
				.then(driver => res.send(driver))
				.catch(next);
		}
};
