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
});
