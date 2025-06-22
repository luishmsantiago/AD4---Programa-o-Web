const express = require('express')
const router = express.Router()
const professorController = require('../controllers/professorController')

router.get('/', professorController.getProfessores)

router.get('/:id', professorController.getProfessor)

router.post('/', professorController.insereProfessor)

router.put('/:id', professorController.updateProfessor)

router.delete('/:id', professorController.deleteProfessor)

module.exports = router
