const {Schema, model} = require('mongoose');


const pointSchema = new Schema({
		type: {type: String, default: 'Point'},
		coordinates: {type: [Number], index: '2dsphere'}
});

const driverSchema = new Schema({
		email: {
				type: String,
				required: true
		},
		driving: {
				type: Boolean,
				default: false
		},
		geometry: pointSchema
});

const Driver = model('Driver', driverSchema);

module.exports = Driver;
