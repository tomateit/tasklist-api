const express = require('express');
// const bodyParser = require('body-parser');
// const {ObjectID} = require('mongodb');
// const _ =require('lodash');
const hbs = require('hbs');
require('./config/config.js');
// const {mongoose} = require('./db/mongoose');
// const {Todo} = require('./models/todo');
// const {User} = require('./models/user');

const todoRouter = require('./tasklist/todoAppRoutes');
const usersRoutes = require('./users/usersRoutes.js');


let port = process.env.PORT; 

let app = express();

//---------HERE GOES WEBMORDA PART -------
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.set('views', __dirname +'/views');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs',{
        pageTitle: 'Max\'s home page',
        mainText: 'Hi, there! Welcome on my site. ' ,
	})
});

app.get('/about', (req, res) => {
    res.render(__dirname + '/views/about.hbs',{
        pageTitle: 'Some info about me',
        mainText: 'On this page I\'d like to share some of my interests and technologies I deal with.',
	})
});

app.get('/weather', (req, res) => {

	const {geocodeAddressByIP} = require('./middleware/geocode/geocode.js');
	const {getWeatherWithIP} = require('./middleware/weather/weather.js')
	/*let ip = req.ip.slice(7)*/;
	let ip = req.headers['x-forwarded-for'] || req.ip;
	console.log("GET WEATHER requested");
	geocodeAddressByIP(ip, (err, data) => {

		if (err) {
			return res.render(__dirname + '/views/error.hbs',{
		        PageTitle: 'Oops, some error',
		        errMainText: 'We tried to detect you location based by IP, but had some problems',
		        errWhy: 'Maybe you are running this app on localhost, or some your\'s or your IPS\'s proxy settings set up wrong headers',
		        errCode: 502,
		        errBody: err
			})
		} 
		getWeatherWithIP(data, (err, obj) => {
			console.log("getWeatherWithIP was invoked")
			if (err){
				return res.render(__dirname + '/views/error.hbs',{
		        PageTitle: 'Oops, some error',
		        errMainText: 'We tried to detect your local weather based by IP location, but had some problems',
		        errWhy: 'Maybe there\'s some weather service fault',
		        errCode: 502,
		        errBody: err
			})
			}

			return res.render(__dirname + '/views/weather.hbs',{
		        pageTitle: 'PROJ3 Weather',
		        mainText: 'Here you will be able to find your local forecast , based on your IP',
		        weather: obj
			})

		})
	});
	 
});

app.get('/tasklist', (req, res) => {
    res.render(__dirname + '/views/tasklist.hbs',{
        pageTitle: 'PROJ3 Tasklist',
        mainText: 'Here you can try a simple todo-app',
	})
});

//---------HERE GOES API PART ------------


app.use('/todoApp', todoRouter);
app.use('/', usersRoutes);

/*

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	let todo = new Todo({
		text: req.body.text
	});
	console.log(req.body);
	todo.save().then((doc) => {
		console.log('Well saved the doc: ', doc);
		res.send(doc);
	}, (err) => {
		console.log('Poorly saved: ', err);

		res.status(400).send(e);
	});
});

app.get('/todos', (req,res ) => {
	Todo.find().then((todos) => {
		res.send({
			todos
		});}
		,(e) => {
		res.status(400).send(e); 	
	});
});

app.get('/todos/:todoID', (req,res) => {
	let todoID = req.params.todoID;
	if (!ObjectID.isValid(todoID)) {
		return res.status(400).send('ID is not valid');
	}

	Todo.findById(todoID).then((todo) => {
		if (!todo) {
			res.status(404).send('Nothing found');
			return console.log('404 404 404');
		}
		console.log('Well found by id: ', todo);
		res.status(200).send({todo});
	}, (err) => {
		console.log(err);
		res.status(500).send('Searching failed');
	}).catch((e) => {
		res.status(400).send();
	});
});

app.delete('/todos/:todoID', (req, res) => {
	let todoID = req.params.todoID;
	if (!ObjectID.isValid(todoID)) {
		return res.status(400).send();
	}
	Todo.findByIdAndRemove(todoID).then((doc) => {
		if (doc === null) {
			return res.status(404).send();
		}
		res.send(doc);
	}).catch((e) => {
		res.status(400).send('Error while deleting');
	});


});


app.patch('/todos/:todoID', (req, res) => {
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

	Todo.findByIdAndUpdate(todoID, {
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




*/

app.get('*', (req,res) => {
	res.status(404).send("No no no, there's nothing interesting here. Maybe you should try correct url?");
})


app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});





 