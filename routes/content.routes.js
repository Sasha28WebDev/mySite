const Router = require('express')
const router = new Router()
const content = require('../controllers/content.controller')

//router.post('/content',content.setContent )
router
    .get('/content',content.getContent)
    .get('/content/:id',content.getContentById)
    .get('/projects',content.getContentProjects)
    .get('/skills',content.getContentSkills)
    .get('/experience',content.getContentExperience)
    .put('/content',content.updateContent)
    .put('/contentdel',content.deleteContent)

//router.delete('/content/:id',contentController.deleteContent)

module.exports = router