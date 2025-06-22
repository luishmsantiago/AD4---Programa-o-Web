const express = require('express')
const router = express.Router()
const cursoController = require('../controllers/cursoController')

router.get('/', cursoController.getCursos)

router.get('/:id', cursoController.getCurso)

router.post('/', cursoController.insereCurso)

router.put('/:id', cursoController.updateCurso)

router.delete('/:id', cursoController.deleteCurso)

module.exports = router
