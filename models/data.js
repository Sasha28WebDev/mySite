const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const projectsSchema = mongoose.Schema({
    n: Number,
    title: String,
    image_url: String,
    description: String,
    href: String
})
const siteDataSchema = mongoose.Schema({
    nickName: String,
    name: String,
    surname: String,
    qualification: String,
    github: String,
    /* 
    about: {
        heading: String,
        content: String,
    }, */
    about :{
        type: String,
        trim:true,
    },
    projects_ids: [ObjectId],
    projects_heading: String,
    projects: [{
        title: String,
        image_url: String,
        description: String,
        href: String
    }
    ],
    location:  {
        type: String,
        maxlength : 255,
        minLength : 5,
        trim:true,
    },
    email: {
        type: String,
        maxlength : 255,
        minLength : 5,
        trim:true,
    },
    website:  {
        type: String,
        maxlength : 255,
        minLength : 5,
        trim:true,
    },

   /*  info: {
        heading: String,
        content: {
            location: String,
            email: String,
            website: String
        }
    }, */
    experience: {
        heading: String,
        content: [{
            title: String,
            place: String,
            year: String,
            explanation: String,
        }]
    }

})

const SiteData = mongoose.model('SiteData', siteDataSchema)

const Projects = mongoose.model('projects', projectsSchema)
module.exports = SiteData

/*
{
    section :{
        info :{
            heading
            content:{
                location
                email
                website
            }
        }
        experience :{
            heading
            content:[
                title
                place
                year (string)
                text
            ]
        }
        experience :{
            heading : 'Опыт работы',
            content : [{
                title : 'Сотрудник',
                place : 'Государственная служба',
                year : '2017 - по н.в.',
                explanation : '',
            }]
        }
        skills :{
            heading
            intro
            skillset :[
                title
                level
                progress(%)
            ]
        }
        education:{
            heading
            content:[
               direction
               degree
               institute
               year 
            ]
        }
        languages :{
            heading
            content:[
                language
                level
            ]
        }
        music:{
            heading
            content:[

            ]
        }
    }
}
*/