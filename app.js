const fs = require('fs');
const http = require('http');
const path = require('path');
require('dotenv').config()
const express = require('express')
const { engine } = require ('express-handlebars');
//const expressHandlebars = require('express-handlebars')
const app = express()
//const mongodb = require('./db')

app.engine('handlebars', engine());
app.set('view engine', 'handlebars')
app.set('views', './views')

const { APP_PORT, APP_IP, APP_PATH } = process.env;
const data = {
  skills_enabled : true,
  skills_h1 : 'Навыки',
  email : 'sasha28webdev@gmail.com',
  location : 'Москва',
  website :'https://sasha28webdev.na4u.ru/',
  text : "Имеются базовые знания в устройстве веб-приложений",
  stack : [
    {name : 'Node.js & Express.js', skill : 'basic',progress : '25%'},
    {name : 'Python & Django', skill : 'beginner',progress : '15%'},
    {name : 'Javascript', skill : 'basic',progress : '30%'},
    {name : 'PostgreSQL', skill : 'basic',progress : '25%'}
  ],
  gitHub : 'https://github.com/Sasha28WebDev'
}
app.use(express.static('./static'))
app.get('/', (req, res) => {
    res.render('home',data);
});
app.get('/admin', (req, res) => {
    res.render('admin');
});
//app.use('/', (req,res)=>{
 //   res.sendFile(path.join(__dirname + '/views/index.html'))})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.listen(APP_PORT,()=>console.log(`server running at http://${APP_IP}:${APP_PORT}/`))

const server = http.createServer(app)


process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing http server.');
  server.close(() => {
    console.log('Http server closed.');
    process.exit(0);
  });
});
