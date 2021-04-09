const { Schema, model } = require('mongoose');

const driverSchema = new Schema({
		 email: {
		 		type: String,
				 required: true
		 },
		driving: {
		 		type: Boolean,
				default: false
		},
});

const Driver = model('Driver', driverSchema);

module.exports = Driver;
