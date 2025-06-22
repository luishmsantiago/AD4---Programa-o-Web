  let cursos = [];
  let currentCursoId = null;

  // Abrir modal
  function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
  }

  // Fechar modal
  function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
  }

  // Função para editar curso
  function editCurso(id) {
    const curso = cursos.find(c => c.id === id);

    if (!curso) {
      console.error("Erro: Curso com ID " + id + " não encontrado nos dados disponíveis.");
      return;
    }

      document.getElementById('cursoId').value = curso.id;
      document.getElementById('nomeCurso').value = curso.nome;
      document.getElementById('sigla').value = curso.sigla;
      document.getElementById('descricao').value = curso.descricao;
      //document.getElementById('semestres').value = curso.semestres;
      document.getElementById('coordenador').value = curso.id_coordenador || ''; // Verifica se 'id_coordenador' existe

    currentCursoId = curso.id;
    openModal('cursoModal');
  }

  // Função para exibir cursos na tabela
  function renderCurso() {
    const tbody = document.querySelector('#cursosTable tbody');
    tbody.innerHTML = '';

    fetch('http://localhost:3000/cursos')
      .then(response => {
        if (!response.ok) { // Tratamento de erro
          throw new Error('Erro ao carregar cursos');
        }
        return response.json();
      })
      .then(dataRecebidaDoBackend => {
        cursos = dataRecebidaDoBackend;
        cursos.forEach((cursoIndividual, index) => { // Melhor prática usar 'cursoIndividual'
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${cursoIndividual.id}</td>
            <td>${cursoIndividual.nome}</td>
            <td>${cursoIndividual.sigla}</td>
            <td>${cursoIndividual.descricao}</td>
            <td>${cursoIndividual.id_coordenador}</td>
            <td>
              <button onclick="editCurso(${cursoIndividual.id})">Editar</button>
              <button onclick="deleteCurso(${cursoIndividual.id})">Excluir</button>
            </td>
          `;
          tbody.appendChild(row);
        });
      })
      .catch(error => console.error('Erro ao buscar cursos:', error));
  }

  // Função para excluir curso 
  function deleteCurso(id) {
    if (confirm('Tem certeza que deseja excluir este curso?')) {
      fetch(`http://localhost:3000/cursos/${id}`, {
          method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) { // Tratamento de erro
                return response.json().then(err => { throw new Error(err.message || 'Falha ao excluir curso'); });
            }
            return response.text(); // ou response.json()
        })
        .then(() => {
          renderCurso();
        })
        .catch(error => console.error('Erro ao excluir curso:', error));
    }
  }


  // Função para adicionar curso
  function addCurso( nomeDoForm, siglaDoForm, descricaoDoForm, coordenadorDoForm ) { // Parâmetros com sufixo 'Form' para clareza
    const dadosParaBackend = { 
      nome: nomeDoForm, 
      sigla: siglaDoForm,
      descricao: descricaoDoForm,
      id_coordenador: coordenadorDoForm // Mapeia para 'id_coordenador' no BD
    };

    console.log("Dados para POST:", dadosParaBackend); // Para depurar o que está sendo enviado

    fetch('http://localhost:3000/cursos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosParaBackend) // Envia o objeto com chaves corretas
      })
      .then(response => {
        if (!response.ok) {
          // Se houver erro, tente ler a mensagem do backend
          return response.json().then(err => {
            throw new Error(err.message || 'Falha ao adicionar curso');
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Adicionado com sucesso:', data);
        renderCurso();
        closeModal('cursoModal');
      })
      .catch(error => {
        console.error('Erro ao adicionar curso:', error);
        alert('Erro ao adicionar curso: ' + error.message);
      });
  }

  // Função para atualizar curso
  function updateCurso(idDoForm, nomeDoForm, siglaDoForm, descricaoDoForm, coordenadorDoForm) { // Parâmetros com sufixo 'Form'
    // Objeto de dados a serem enviados no BODY do PUT.
    const dadosParaBackend = { 
      nome: nomeDoForm, 
      sigla: siglaDoForm,
      descricao: descricaoDoForm,
      id_coordenador: coordenadorDoForm
    };

    console.log("Dados para PUT:", dadosParaBackend); // Para depurar o que está sendo enviado

    fetch(`http://localhost:3000/cursos/${idDoForm}`, { // ID na URL
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosParaBackend) // Envia o objeto com chaves corretas
      })
      .then(response => {
        if (!response.ok) {
          // Se houver erro, tente ler a mensagem do backend
          return response.json().then(err => {
            throw new Error(err.message || 'Falha ao atualizar curso');
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Atualizado com sucesso:', data);
        renderCurso();
        closeModal('cursoModal');
      })
      .catch(error => {
        console.error('Erro ao atualizar curso:', error);
        alert('Erro ao atualizar curso: ' + error.message);
      });
  }

  document.addEventListener('DOMContentLoaded', function() {

    // Botão "Adicionar Curso"
    document.getElementById('addCurso').addEventListener('click', function() {
      currentCursoId = null;
      document.getElementById('cursoForm').reset();
      document.getElementById('cursoId').value = ''; // Garante que o ID hidden esteja vazio
      openModal('cursoModal');
    });

    // Botões de fechar modais
    document.querySelectorAll('.close').forEach(function(btn) {
      btn.addEventListener('click', function() {
        closeModal('cursoModal');
      });
    });

    // Submissão do formulário
    document.getElementById('cursoForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const codigoDoForm = document.getElementById('cursoId').value; // Captura o ID do curso (se existir)
      // Captura os valores dos campos do formulário
      const idDoForm = document.getElementById('cursoId').value; 
      const nomeDoForm = document.getElementById('nomeCurso').value;
      const siglaDoForm = document.getElementById('sigla').value; 
      const descricaoDoForm = document.getElementById('descricao').value; 
      const coordenadorDoForm = document.getElementById('coordenador').value; 
      console.log("Dados do formulário:", { idDoForm, nomeDoForm, siglaDoForm, descricaoDoForm, coordenadorDoForm });
      if (codigoDoForm) { // Se o campo 'codigo' (ID) tem um valor, é uma atualização (PUT)
        updateCurso(idDoForm, nomeDoForm, siglaDoForm, descricaoDoForm, coordenadorDoForm);
      } else { // Se o campo 'codigo' está vazio, é uma nova adição (POST)
        addCurso(nomeDoForm, siglaDoForm, descricaoDoForm, coordenadorDoForm);
      }
    });

    // Carrega cursos ao iniciar a página
    renderCurso();
  });