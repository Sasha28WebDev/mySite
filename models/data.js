const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

/* const projectsSchema = mongoose.Schema({
    n: Number,
    title: String,
    image_url: String,
    description: String,
    href: String
}) */
const siteDataSchema = mongoose.Schema({
    nickName: {
        type: String,
        required: true,
    },
    name: String,
    surname: String,
    qualification: String,
    github: String,
    about: {
        type: String,
        trim: true,
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
    location: {
        type: String,
        maxlength: 255,
        minLength: 5,
        trim: true,
    },
    email: {
        type: String,
        maxlength: 255,
        minLength: 5,
        trim: true,
        required: true,
    },
    website: {
        type: String,
        maxlength: 255,
        minLength: 5,
        trim: true,
    },

    /*  info: {
         heading: String,
         content: {
             location: String,
             email: String,
             website: String
         }
     }, */
    experience: [{
        title: String,
        place: String,
        year: String,
        explanation: String,
    }],
    skills_intro: String,
    skills: [{
        skill_name: String,
        level: String,
        progress: {
            type: Number,
            min: 0,
            max: 100
        }
    }]
})

const userSchema = new mongoose.Schema({
    nickName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    
    encryptedPassword: {
        type: String,
        required: true,
    },
});

const SiteData = mongoose.model('SiteData', siteDataSchema)
const User = mongoose.model('User', userSchema);
module.exports = { siteDataSchema, SiteData, userSchema, User }