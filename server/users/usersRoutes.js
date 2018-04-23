const express = require('express');
let Router = express.Router();

const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ =require('lodash');

const {mongoose} = require('../db/mongoose');
const {User} = require('../models/user');
const {authenticate} = require('../middleware/authenticate')
Router.use(bodyParser.json());




Router.post('/users', (req,res) => {
	let body = _.pick(req.body, ['email','password']);
	let user = new User(body);
	
	user.save().then((user) => {
		return user.generateAuthToken();		
	}).then((token) => {
		res.header('x-auth', token).send(user);
	}).catch((err) => {
		console.log("Error while saving user", err);
		res.status(500).end("Error while saving user \n" + err).send();
	})
});



Router.get('/users/me', authenticate, (req,res) => {
	res.send(req.user);
})

module.exports = Router;