const express = require('express');
let Router = express.Router();

const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ =require('lodash');

const {mongoose} = require('../db/mongoose');
const {Todo} = require('../models/todo');

const {authenticate} = require('../middleware/authenticate')



Router.use(bodyParser.json());

Router.get('/todos', authenticate, (req,res ) => {
	Todo.find({
		_creator: req.user._id
	}).then((todos) => {
		res.send({
			todos
		});}
		,(err) => {
		res.status(400).send(); 	
	});
});

Router.post('/todos', authenticate, (req, res) => {
	let todo = new Todo({
		_creator: req.user._id,
		text: req.body.text
	});
	console.log(req.body);
	todo.save().then((doc) => {
		console.log('Well saved the doc: ', doc);
		res.send(doc);
	}, (err) => {
		console.log('Poorly saved: ', err);

		res.status(400).send();
	});
});

Router.get('/todos/:todoID',authenticate, (req,res) => {
	let todoID = req.params.todoID;
	if (!ObjectID.isValid(todoID)) {
		return res.status(400).send('ID is not valid');
	}

	Todo.findOne({
		_id: todoID,
		_creator: req.user._id
		}).then((todo) => {
		if (!todo) {
			res.status(404).send('Nothing found');
			return console.log('404 404 404');
		}
		console.log('Well found by id: ', todo);
		res.status(200).send({todo});
	}, (err) => {
		console.log(err);
		res.status(500).send('Searching failed');
	}).catch((err) => {
		res.status(400).send();
	});
});

Router.delete('/todos/:todoID', authenticate, (req, res) => {
	let todoID = req.params.todoID;
	if (!ObjectID.isValid(todoID)) {
		return res.status(400).send();
	}
	Todo.findOneAndRemove({
		_id: todoID,
		_creator: req.user._id}).then((doc) => {
		if (doc === null) {
			return res.status(404).send();
		}
		res.send(doc);
	}).catch((err) => {
		res.status(400).send('Error while deleting');
	});


});


Router.patch('/todos/:todoID', authenticate, (req, res) => {
	let todoID = req.params.todoID;
	let body = _.pick(req.body, ['text', 'completed']);

	if (!ObjectID.isValid(todoID)) {
		return res.status(400).send();
	}

	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findOneAndUpdate({
		_id: todoID, 
		_creator: req.user._id}, {
		$set: body
	}, {new: true}).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		}
		
		res.send({todo});


	}).catch((err) => {
		res.status(400).send();
	});
});

module.exports = Router;