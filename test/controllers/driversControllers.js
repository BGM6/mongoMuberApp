const assert = require('assert');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');
const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
		it('Post to /api/drivers creates a new driver', (done) => {
				Driver.count().then(count => {
						request(app)
						.post('/api/drivers')
						.send({email: 'test@test.com'})
						.end(() => {
								Driver.count().then(newCount => {
										assert(count + 1 === newCount);
										done();
								});
						});
				});
		});

		it('Put to /api/drivers/id edits an exiting driver', (done) => {
				const driver = new Driver({email: 'testing@test.com', driving: false});

				driver.save().then(() => {
						request(app)
						.put(`/api/drivers/${driver._id}`)
						.send({driving: true})
						.end(() => {
								Driver.findOne({email: 'testing@test.com'});
						})
						.then(driver => {
								assert(driver.driving === true);
								done();
						});
				});
		});

		it('Delete to /api/drivers/id can delete a driver', async done => {
				const driver = new Driver({email: 'test@test.com'});

				await driver.save()
				.then(() => {
						request(app)
						.delete(`/api/drivers/${driver._id}`)
						.end(() => {
								Driver.findOne({email: 'testing@test.com'})
								.then((driver) => {
										assert(driver === null);
										done();
								});
						});
				});
		});

		it('GET to /api/drivers find drivers in a location', done => {
				const seattleDriver = new Driver({
						email: 'seattle@test.com',
						geometry: {type: 'Point', coordinates: [-122.4759902, 47.6147628]}
				});
				const miamiDriver = new Driver({
						email: 'miami@test.com',
						geometry: {type: 'Point', coordinates: [-80.253, 27.791]}
				});

				Promise.all([seattleDriver.save(), miamiDriver.save()])
				.then(() => {
						request(app)
						.get('/api/drivers?lng=-80&lat=25')
						.end((err, response) => {
								console.log(response);
								done();
						});
				});
		});
});
