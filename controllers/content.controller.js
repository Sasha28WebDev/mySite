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
        /* const data = await db.getData({ name: "Александр" }, { projects: 1 }) */
        // res.json(content)
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
                const { pr_id,title, description, image, link } = req.body
                //db.collection("collectionName").update({"items.x" : 11}, {"$set" : {"items.$.val" : "any_value"}}
                id = {
                    "_id" : id,
                    'projects._id': pr_id
                }
                newData = {
                    $set:
                    {
                        'projects.$.title': title,
                        'projects.$.description': description,
                        'projects.$.image_url': image,
                        'projects.$.href': link
                    }

                }



                break
            }
            default: { newData = req.body }
        }
        console.log(id, newData)
        SiteData.findOneAndUpdate(id, newData, (err, result) => {
            if (err) {
                return res.status(400).json({ message: "error" })
            }
            console.log(result)
            res.json({ message: "updated" })
        })
    }
   /*  async updateContent(req, res) {
        //console.log(req.body)
        const { block } = req.body
        console.log(`block : ${block}`)
        let newData = {}
        let id = ''
        //в теле запроса передаем название блока, данные в котором мы хотим изменить
        switch (block) {
            case ("main"): {
                const { name, surname, qualification, github } = req.body
                newData = { name, surname, qualification, github }
                console.log(newData)
                const data = await db.updateData(newData)
                res.json({ 'status': data })
                break
            }
            case ('about'): {
                const { heading, content } = req.body
                newData = { about: { heading, content } }
                break
            }
            case ('experience'): {
                const { heading } = req.body
                const content = req.body.content
                newData = {
                    experience: {
                        heading,
                        content
                    }
                }
                console.log(newData)
                break
            }
            case ('projects'): {
                const { heading } = req.body
                const content = req.body.content
                newData = {
                    projects: {
                        heading,
                        content
                    }
                }
                console.log(newData)
                break
            }
            case ('projects-test'): {
                const { id, currentTitle, title, image_url, description, href } = req.body
                console.log(id)
                newData = {
                    "projects.$.title": title,
                    "projects.$.description": description
                }//, image_url, description, href }
                console.log(`newdata = ${newData} , id =${currentTitle}`)
                const data = await db.updateDataArr(newData, currentTitle)
                res.json({ 'status': data })
                break
            }
            case ('info'): {
                const { heading } = req.body
                const { location, email, website } = req.body.content
                newData = {
                    info: {
                        heading,
                        content: { location, email, website }
                    }
                }
                console.log(newData)
                break
            }
            default: { }
        }
        ///* if (id === '') {
        const data = await db.updateData(newData)
        res.json({ 'status': data })
        //}
        else {
            const data = await db.updateData({ id }, newData)
            res.json({ 'status': data })
        } 


    } */
}
module.exports = new ContentController()