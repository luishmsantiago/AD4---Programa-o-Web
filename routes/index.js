const express = require('express')
const router = express.Router()

//rotas para professores e cursos
router.use('/professores', require('./professores'))
router.use('/cursos', require('./cursos'))

//rotas para disciplinas
// router.use('/disciplinas', require('./disciplinas'))

module.exports = router
