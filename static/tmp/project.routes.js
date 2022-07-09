const Router = require('express')
const router = new Router()
const project= require('../controllers/project.controller')


router.get('/project',project.getProjects)

router.get('/project/:id',project.getProjectsById)
router.post('/project',project.addProject)
router.delete('/project/:title',project.deleteProjects)


module.exports = router