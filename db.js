
require('dotenv').config()
const mongoose = require('mongoose')
const { DB_CONNECTION_STRING } = process.env
const SiteData = require('./models/data')

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
    //useCreateIndex: true
})
const db = mongoose.connection
db.on('error', err => {
    console.error('Ошибка MongoDB' + err.message)
    process.exit(1)
})
db.once('open', () => { console.log('Установлено соедниение с MongoDB') })


//Если записей в бд нет,то наполняем ее базовыми данными
SiteData.find((err, data) => {
    if (err) return console.error(err)
    if (data.length) return

    new SiteData({
        nickName: 'sasha28webdev',
        name: 'Александр',
        surname: 'Веревкин',
        qualification: 'Junior backend developer',
        github: 'https://github.com/Sasha28WebDev/',
        about: `Write a brief intro about yourself. It's a good idea to include your personal interests and hobbies as well. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec. Commodo ligula eget dolor. Aenean massa.`,
        projects_heading: "Проекты",
        projects: [{
            title: 'Управление контентом сайта-визитки',
            image_url: '',
            description: '',
            href: 'https://github.com/Sasha28WebDev/mySite'
        },
        {
            title: 'Учебно-методический комплекс кафедры',
            image_url: '',
            description: '',
            href: 'https://github.com/Sasha28WebDev/UMK'
        }
        ]
        ,
        location: 'Москва',
        email: 'sasha28webdev@gmail.com',
        website: 'https://sasha28webdev.na4u.ru/',
        skills_intro: "Немного про мои навыки",
        skills: [{
            skill_name: "Node.js & Express.js",level: "basic",progress: 35
        },
        {
            skill_name: "Python & Django",
            level: "basic",
            progress: 20
        }]

    }).save()
})

module.exports = {
    db,
    getData: async (options1 = {}, options2 = {}) => SiteData.findOne(options1, options2),
    /*updateData: async (options = {}) => SiteData.updateOne(
        { nickName: "sasha28webdev" },
        { $set: options }),
    updateDataArr: async (options = {}, title) => SiteData.updateOne(
        { "projects.title": title },
        { $set: options }),
    addData: async (options = {}, target) => SiteData.updateOne(
        { nickName: "sasha28webdev" },
        { $push: { target: options } },//{projects : options}
        { upsert: true }) */
}
















