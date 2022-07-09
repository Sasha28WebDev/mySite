const db = require('../db')
const SiteData = require('../models/data')

class ContentController {
    /* async getContent(req, res) {
        const data = await db.getData()
        res.json(data)
    } */
    async getContent(req, res, next) {
        let content = []
        try {
            content = await SiteData.findOne({})
        } catch (err) {
            return next(err)
        }
        res.json(content)
    }
    async getContentById(req, res, next) {
        const id = req.params.id
        let content = []
        try {
            content = await SiteData.findById(id).exec()
        } catch (err) {
            return next(err)
        }
        res.json(content)
    }
    async getContentProjects(req, res, next) {
        let content = []
        try {
            content = await SiteData.find({ nickName: "sasha28webdev" }, { projects: 1 })
        } catch (err) {
            return next(err)
        }
        res.json(content)
    }
    async getContentSkills(req, res, next) {
        let content = []
        try {
            content = await SiteData.find({ nickName: "sasha28webdev" }, { skills: 1 })
        } catch (err) {
            return next(err)
        }
        res.json(content)
    }
    async getContentExperience(req, res, next) {
        let content = []
        try {
            content = await SiteData.find({ nickName: "sasha28webdev" }, { experience: 1 })
        } catch (err) {
            return next(err)
        }
        res.json(content)
    }
    /* 
    async getProjects(req, res) {
        const data = await db.getProjects()
        res.json(data)
    } */


    async updateContent(req, res, next) {
        //console.log(req.params.id)
        let { id, block } = req.body
        let newData = {}
        switch (block) {
            case ('info'): {
                const { location, email, website } = req.body
                newData = { location, email, website }
                break
            }
            case ('about'): {
                const { about } = req.body
                newData = { about }
                break
            }
            case ('projects'): {
                const { pr_id, title, description, image_url, link } = req.body
                //db.collection("collectionName").update({"items.x" : 11}, {"$set" : {"items.$.val" : "any_value"}}
                //console.log(`pr_id:${pr_id}`)
                if (pr_id === '') {
                    newData = {
                        $push:
                        {
                            'projects': {
                                title,
                                description,
                                image_url,
                                href: link
                            }
                        }

                    }
                } else {
                    id = {
                        "_id": id,
                        'projects._id': pr_id
                    }
                    newData = {
                        $set:
                        {
                            'projects.$.title': title,
                            'projects.$.description': description,
                            'projects.$.image_url': image_url,
                            'projects.$.href': link
                        }
                    }
                }
                break
            }case ('skills'): {
                const { skill_id, skill_name, level, progress } = req.body
                //db.collection("collectionName").update({"items.x" : 11}, {"$set" : {"items.$.val" : "any_value"}}
                //console.log(`pr_id:${pr_id}`)
                if (skill_id === '') {
                     newData = {
                        $push:
                        {
                            'skills': {
                                skill_name, level, progress
                            }
                        }

                    } 
                } else {
                    id = {
                        "_id": id,
                        'skills._id': skill_id
                    }
                    newData = {
                        $set:
                        {
                            'skills.$.skill_name': skill_name,
                            'skills.$.level': level,
                            'skills.$.progress': progress,
                        }
                    }
                }
                break
            }case ('experience'): {
                const { exp_id, title, place, year, explanation } = req.body
                //db.collection("collectionName").update({"items.x" : 11}, {"$set" : {"items.$.val" : "any_value"}}
                //console.log(`pr_id:${pr_id}`)
                if (exp_id === '') {
                     newData = {$push:{'experience': {title, place, year, explanation}}} 
                } else {
                    id = {
                        "_id": id,
                        'experience._id': skill_id
                    }
                    newData = {
                        $set:
                        {
                            'experience.$.title': title,
                            'experience.$.place': place,
                            'experience.$.year': year,
                            'experience.$.explanation': explanation
                        }
                    }
                }
                break
            }
            
            default: { newData = req.body }
        }
        console.log(id, newData)
        SiteData.findOneAndUpdate(id, newData, (err, result) => {
            if (err) {
                return res.status(400).json({ message: err })
            }
            res.json({ message: "updated" })
        })
    }
    async deleteContent(req, res, next) {
        let { id, block } = req.body
        //console.log(req.params.id)
        let delData
        switch (block) {
            case ('projects'): {
                const { pr_id } = req.body
                delData = { $pull: { projects: { _id: pr_id } } }
                break
            }
            case ('skills'): {
                const {skill_id } = req.body
                delData = { $pull: { skills: { _id: skill_id } } }
                break
            }
            default: { }
        }
        console.log(id, delData)
        SiteData.findOneAndUpdate({ _id: id }, delData, { 'new': true }, (err, result) => {
            if (err) {
                return res.status(400).json({ message: err })
            }
            res.json({ message: "deleted" })
        })
    }
}
module.exports = new ContentController()