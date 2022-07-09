const fs = require('fs')
const http = require('http')
const path = require('path')
const passport = require('passport')
require('dotenv').config()
const express = require('express')
//const bodyParser = require('body-parser')
const createError = require('http-errors');
const { engine } = require('express-handlebars');
const app = express()
require('dotenv').config()
const { APP_PORT, APP_IP, APP_PATH } = process.env;
const { default: AdminBro } = require('admin-bro');
const options = require('./controllers/admin.controller');





const handlers = require('./lib/handlers')
const contentRouter = require('./routes/content.routes')
const buildAdminRouter  = require('./routes/admin.routes')

app.engine('handlebars', engine());
app.set('view engine', 'handlebars')
app.set('views', './views')

//-----------------------middleware------------------------

app.use(express.static('../static'))


//------------------------routes----------------------------

app.get('/', handlers.dataList)
app.use('/api', contentRouter)
const admin = new AdminBro(options);
const router = buildAdminRouter(admin);
app.use(admin.options.rootPath, router);
/* app.use(function (err, req, res, next) {
  res.status(500).send('Something broke!')
}) */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// catch 404 and forward to error handler
/* app.use(function(req, res, next) {
  next(createError(404));
}); */


app.listen(APP_PORT, () => console.log(`SERVER running at http://${APP_IP}:${APP_PORT}`))




/*

const server = http.createServer(app)


process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing http server.');
  server.close(() => {
    console.log('Http server closed.');
    process.exit(0);
  });
});
*/