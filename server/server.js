require('./config/config.js');
const express = require('express');
const bodyParser = require('body-parser');

const hbs = require('hbs');
let port = process.env.PORT; 

let app = express();
app.use(bodyParser.json());

const todoRouter = require('./routes/todoAppRoutes');
const usersRoutes = require('./routes/usersRoutes.js');
const weatherRoutes = require('./routes/weatherRoutes.js');
//---------HERE GOES WEBMORDA PART -------
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.set('views', __dirname +'/views');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs')
});

app.get('/about', (req, res) => {
    res.render('about')
});


//---------HERE GOES API PART ------------


app.use('/todoApp', todoRouter);
app.use('/weather', weatherRoutes);
app.use(usersRoutes);

app.get('*', (req,res) => {
	res.status(404).send("No no no, there's nothing interesting here. Maybe you should try correct url?");
})


app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});





 