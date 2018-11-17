const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
// const fs=require('fs');


app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile("server.log",log +'\n'	, (err)=>{
  	if(err){
  		console.log(err);
  	}

  })

  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});

app.use((req, res, next) => {

	// var now =new Date().toTimeString();
	// console.log(`time when log in is :${now}  :: ${req.method+" "+req.url}`);
	// next();
  res.render('maintenance.hbs');
 // res.render('home.hbs');
});


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
