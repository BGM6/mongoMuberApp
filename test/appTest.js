const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('The express app', () => {
		it('handles a GET request to /api', (done) => {
				request(app)
				.get('/api')
				.end((err, response) => {
						assert(response.body.name === 'Bryan');
						done();
				});
		});
});


beforeEach(done => {
		const {drivers} = mongoose.connection.collections;
		drivers.drop()
		.then(() => done())
		.catch(() => done());
});
