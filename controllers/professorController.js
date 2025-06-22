const Professor = require('../models/Professor')

exports.getProfessores = async (req, res) => {
  try {
    const professores = await Professor.getAll();
    res.json(professores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getProfessor = async (req, res) => {
  const id = req.params.id
  try {
    const professor = await Professor.getById(id);
    console.log(professor)
    res.json(professor)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}

exports.insereProfessor = async (req, res) => {
  try {
    const { nome, email } = req.body;

    const professor = await Professor.insert({ 
      nome, 
      email 
    });
    res.status(201).json(professor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.updateProfessor = async (req, res) => {
  const id = req.params.id
  try {
    const { nome, email } = req.body;
    const professor = await Professor.update(id, nome, email)
    console.log(professor)
    res.json(professor)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
}

exports.deleteProfessor = async (req, res) => {
  const id = req.params.id
  const professor = await Professor.delete(id)
  try {
    res.json({message: 'Professor excluído com sucesso', id});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}