const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
dotenv.config();

// Routes Import
const authRoutes = require('./routes/auth-routes');
const teamRoutes = require('./routes/team-routes');

// Connect and configure DB

mongoose.connect(
	process.env.DB_CONNECT,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => {
		console.log('Connected to db!');
	}
);
mongoose.set('useCreateIndex', true);

// General Middlewares
app.use(express.json());
app.use(cookieParser());

//Route middlewares
app.use('/user', authRoutes);
app.use('/team', teamRoutes);
app.listen(process.env.port, () => console.log(`Service is up and running on port ${process.env.port}`));
