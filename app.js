const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
		mongoose.connect('mongodb://localhost:27017/muber', {
				useNewUrlParser: true,
				useCreateIndex: true,
				useUnifiedTopology: true,
				useFindAndModify: false
		});
		const db = mongoose.connection;
		db.on('error', console.error.bind(console, 'CONNECTION OPEN'));
		db.once('open', () => {
				console.log('CONNECTION OPEN');
		});
}
//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

routes(app);
app.use((err, req, res, next) => {
		res.status(422).send({error: err.message});
});


module.exports = app;
