const Router = require('express')
const router = new Router()
const content = require('../controllers/content.controller')

//router.post('/content',content.setContent )
router.get('/content',content.getContent)
router.get('/content/:id',content.getContentById)
router.get('/projects',content.getContentProjects)
router.get('/skills',content.getContentSkills)
router.get('/experience',content.getContentExperience)
router.put('/content',content.updateContent)
router.put('/contentdel',content.deleteContent)

//router.delete('/content/:id',contentController.deleteContent)

module.exports = router