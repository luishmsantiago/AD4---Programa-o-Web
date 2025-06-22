let cursos = [];
let currentCursoId = null;

// Altera a propriedade display para block, exibindo a modal que estava none
function openModal(modalId){
  document.getElementById(modalId).style.display = 'block';
}

// Altera a propriedade display para none, ocultando a modal
function closeModal(modalId){
  document.getElementById(modalId).style.display = 'none';
}

// Listener para o botão addCurso, vai chamar a openModal()
const btAddCurso = document.getElementById('addCurso');
btAddCurso.addEventListener('click', function() {
  currentCursoId = null;
  document.getElementById('cursoForm').reset();
  openModal('cursoModal');
})

// Listener para fechar modais
document.querySelectorAll('.close').forEach(function(closeBtn) {
  closeBtn.addEventListener('click', function() {
    closeModal('cursoModal');
  })
});

//carrega os cursos como linhas da tabela

function renderCursos() {
  const tbody = document.querySelector('#cursosTable tbody');
  tbody.innerHTML = '';
  cursos.forEach((curso, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${curso.nomeCurso}</td>
      <td>${curso.semestres}</td>
      <td>${curso.coordenador}</td>
      <td>
        <button onclick="editCurso(${index})">Editar</button>
        <button onclick="deleteCurso(${index})">Excluir</button>
      </td>
      ` ;
    tbody.appendChild(row);
  });
} 

function editCurso(index){
  const curso = cursos[index];
  document.getElementById('codigo').value = curso.codigo;
  document.getElementById('nomeCurso').value = curso.nomeCurso;
  document.getElementById('semestres').value = curso.semestres;
  document.getElementById('coordenador').value = curso.coordenador;
  currentCursoId = index;
  openModal('cursoModal');
}

function deleteCurso(index) {
  if(confirm('Tem certeza que deseja excluir este curso?')) {
    cursos.splice(index, 1); 
    renderCursos();
  }
}

function addCurso(codigo, nomeCurso, semestres, coordenador) {
  cursos.push({ codigo, nomeCurso, semestres, coordenador });
}

const cursoForm = document.getElementById('cursoForm');
cursoForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const codigo = document.getElementById('codigo');
  const nomeCurso = document.getElementById('nomeCurso').value;
  const semestres = document.getElementById('semestres').value;
  const coordenador = document.getElementById('coordenador').value;
  //inclusão ou alteração

  if (currentCursoId !== null) {
    cursos[currentCursoId] = { codigo, nomeCurso, semestres, coordenador };
  } else {
    addCurso(codigo, nomeCurso, semestres, coordenador);
  }

  closeModal('cursoModal');
  renderCursos();
});

renderCursos();