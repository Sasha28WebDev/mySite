const fs = require('fs');
const http = require('http');
const path = require('path');
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const createError = require('http-errors');
const { engine } = require ('express-handlebars');
const app = express()
const handlers = require('./lib/handlers')
const contentRouter = require('./routes/content.routes')
//const projectRouter = require('./routes/project.routes')
const { APP_PORT, APP_IP, APP_PATH } = process.env;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(express.static('./static'))
app.use(express.json())



app.get('/', handlers.dataList)
app.use('/api',contentRouter)
app.get('/admin',(req,res)=>{
  res.sendFile(path.join(__dirname + '/views/admin.html'))
})
// catch 404 and forward to error handler
/* app.use(function(req, res, next) {
  next(createError(404));
}); */
app.use(function(err,req, res, next) {
    res.status(500).send('Something broke!')
})
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
