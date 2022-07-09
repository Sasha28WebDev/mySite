const db = require('../db')

class ProjectController {
    async getProjectsById(req, res) {
        const data = await db.getProjects({ _id: req.params.id })
        res.json(data)
    }
    async getProjects(req, res) {
        const data = await db.getProjects()
        res.json(data)
    }
    async addProject(req, res) {
        const {title,image_url,description,href} = req.body
        const projectData = {title,image_url,description,href}
        const data = await db.addProject(projectData,(err,result)=>{
            console.log(result)
        })
        res.json(data)
    }
    async deleteProjects(req,res){
        console.log(req.params.title)
        const data = await db.deleteProjects({"title" : req.params.title})
        res.json(data)
    }
}
module.exports = new ProjectController()