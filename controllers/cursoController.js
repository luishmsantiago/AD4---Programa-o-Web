const Curso = require('../models/Curso')

exports.getCursos = async (req, res) => {
  try {
    const cursos = await Curso.getAll();
    res.json(cursos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getCurso = async (req, res) => {
  const id = req.params.id
  try {
    const curso = await Curso.getById(id);
    console.log(curso)
    res.json(curso)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}

exports.insereCurso = async (req, res) => {
  try {
    console.log(req.body)
    console.log("Erro está aqui")
    const { sigla, descricao, id_coordenador, nome } = req.body;
    const curso = await Curso.insert({ 
      sigla,
      descricao,
      id_coordenador, 
      nome
    });
    res.status(201).json(curso);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.updateCurso = async (req, res) => {
  const id = req.params.id
  try {
    const { sigla, descricao, id_coordenador, nome } = req.body;
    
    const curso = await Curso.update(id, sigla, descricao, id_coordenador, nome )
    console.log(curso)
    res.json(curso)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
}

exports.deleteCurso = async (req, res) => {
  const id = req.params.id
  const curso = await Curso.delete(id)
  try {
    res.json({message: 'Curso excluído com sucesso', id});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}