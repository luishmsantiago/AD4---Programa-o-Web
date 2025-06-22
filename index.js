const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())

app.use(cors({
  origin: '*'
}))

app.get('/', (req, res) => {
  res.send('Olá, Mundo!');
})

app.get('/sobre', (req, res) => {
  res.send('Essa página sobre');
})

app.use('/', require('./routes'))




// app.post('/professores', (req, res) => {
//   console.log(req.body);
//   res.send('A requisição POST para professores/ chegou: '+req.body.nomeProf);
// })

// app.put('/professores', (req, res) => {
//   console.log(req.body);
//   res.send('A requisição PUT para professores/ chegou: '+req.body.codigo);
// })

// app.get('/professores/:_id', (req, res) => {
//   console.log(req.body);
//   res.send('A requisição GET para professores/ chegou: '+req.body.codigo);
// })


// app.delete('/professores/:_id', (req, res) => {
//   console.log(req.body);
//   res.send('A requisição DELETE para professores/ chegou: '+req.body.codigo);
// })

// app.get('/cursos', (req, res) => {
//   //Carrega o arquivo cursos.json
//   const cursos = require('../public/cursos.json');

//   //Enviar o arquivo json como resposta
//   res.json(cursos);
// })

// app.post('/cursos', (req, res) => {
//   console.log(req.body);
//   res.send('A requisição POST para cursos/ chegou: '+req.body.nomeCurso);
// })

// app.put('/cursos', (req, res) => {
//   console.log(req.body);
//   res.send('A requisição PUT para cursos/ chegou: '+req.body.codigo);
// })

// app.get('/cursos/:_id', (req, res) => {
//   console.log(req.body);
//   res.send('A requisição PUT para cursos/ chegou: '+req.body.codigo);
// })

// app.delete('/cursos/:_id', (req, res) => {
//   console.log(req.body);
//   res.send('A requisição DELETE para cursos/ chegou: '+req.body.codigo);
// })

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
})