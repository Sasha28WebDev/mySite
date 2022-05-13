
require('dotenv').config()   
const mongoose = require('mongoose')
const {DB_CONNECTION_STRING} = process.env

mongoose.connect(DB_CONNECTION_STRING)
const db = mongoose.connection
db.on('error',err=>{
    console.error('Ошибка MongoDB'+ err.message)
    process.exit(1)
})
db.once('open',()=>{console.log('Установлено соедниение с MongoDB')})


















