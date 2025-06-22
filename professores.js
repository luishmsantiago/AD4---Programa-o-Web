  let profs = [];
  let currentProfId = null;

  // Abrir modal
  function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
  }

  // Fechar modal
  function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
  }

  // Função para editar professor
  function editProf(id) {
    const prof = profs.find(p => p.id === id);

    if (!prof) {
      console.error("Erro: Professor com ID " + id + " não encontrado nos dados disponíveis.");
      return;
    }

    document.getElementById('codigo').value = prof.id;
    document.getElementById('nomeProf').value = prof.nome;
    document.getElementById('email').value = prof.email;
    document.getElementById('sala').value = prof.sala || '';

    currentProfId = prof.id;
    openModal('profModal');
  }

  // Função para exibir professores na tabela
  function renderProf() {
    const tbody = document.querySelector('#profTable tbody');
    tbody.innerHTML = '';

    fetch('http://localhost:3000/professores')
      .then(response => {
        if (!response.ok) { // Tratamento de erro
          throw new Error('Erro ao carregar professores');
        }
        return response.json();
      })
      .then(dataRecebidaDoBackend => {
        profs = dataRecebidaDoBackend;
        profs.forEach((profIndividual, index) => { // Melhor prática usar 'profIndividual'
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${profIndividual.id}</td>
            <td>${profIndividual.nome}</td>
            <td>${profIndividual.email}</td>
            <td>
              <button onclick="editProf(${profIndividual.id})">Editar</button>
              <button onclick="deleteProf(${profIndividual.id})">Excluir</button>
            </td>
          `;
          tbody.appendChild(row);
        });
      })
      .catch(error => console.error('Erro ao buscar professores:', error));
  }

  // Função para excluir professor 
  function deleteProf(id) {
    if (confirm('Tem certeza que deseja excluir este professor?')) {
      fetch(`http://localhost:3000/professores/${id}`, {
          method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) { // Tratamento de erro
                return response.json().then(err => { throw new Error(err.message || 'Falha ao excluir professor'); });
            }
            return response.text(); // ou response.json()
        })
        .then(() => {
          renderProf();
        })
        .catch(error => console.error('Erro ao excluir professor:', error));
    }
  }


  // Função para adicionar professor (CORRIGIDA)
  function addProf(nomeProfForm, emailForm, salaForm) { // Parâmetros com sufixo 'Form' para clareza
    const dadosParaBackend = { 
      nome: nomeProfForm, // Mapeia 'nomeProfForm' do HTML para 'nome' do BD
      email: emailForm,
      sala: salaForm // Captura e envia 'sala'
    };

    console.log("Dados para POST:", dadosParaBackend); // Para depurar o que está sendo enviado

    fetch('http://localhost:3000/professores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosParaBackend) // Envia o objeto com chaves corretas
      })
      .then(response => {
        if (!response.ok) {
          // Se houver erro, tente ler a mensagem do backend
          return response.json().then(err => {
            throw new Error(err.message || 'Falha ao adicionar professor');
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Adicionado com sucesso:', data);
        renderProf();
        closeModal('profModal');
      })
      .catch(error => {
        console.error('Erro ao adicionar professor:', error);
        alert('Erro ao adicionar professor: ' + error.message);
      });
  }

  // Função para atualizar professor
  function updateProfessor(idProfessor, nomeProfForm, emailForm) { // Parâmetros com sufixo 'Form'
    // Objeto de dados a serem enviados no BODY do PUT.
    const dadosParaBackend = { 
      nome: nomeProfForm, // Mapeia 'nomeProfForm' do HTML para 'nome' do BD
      email: emailForm,
    };

    console.log("Dados para PUT:", dadosParaBackend); // Para depurar o que está sendo enviado

    fetch(`http://localhost:3000/professores/${idProfessor}`, { // ID na URL
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosParaBackend) // Envia o objeto com chaves corretas
      })
      .then(response => {
        if (!response.ok) {
          // Se houver erro, tente ler a mensagem do backend
          return response.json().then(err => {
            throw new Error(err.message || 'Falha ao atualizar professor');
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Atualizado com sucesso:', data);
        renderProf();
        closeModal('profModal');
      })
      .catch(error => {
        console.error('Erro ao atualizar professor:', error);
        alert('Erro ao atualizar professor: ' + error.message);
      });
  }

  document.addEventListener('DOMContentLoaded', function() {

    // Botão "Adicionar Professor"
    document.getElementById('addProf').addEventListener('click', function() {
      currentProfId = null;
      document.getElementById('profForm').reset();
      document.getElementById('codigo').value = ''; // Garante que o ID hidden esteja vazio
      openModal('profModal');
    });

    // Botões de fechar modais
    document.querySelectorAll('.close').forEach(function(btn) {
      btn.addEventListener('click', function() {
        closeModal('profModal');
      });
    });

    // Submissão do formulário
    document.getElementById('profForm').addEventListener('submit', function(e) {
      e.preventDefault();

      // Captura os valores dos campos do formulário
      const codigoDoForm = document.getElementById('codigo').value; 
      const nomeDoForm = document.getElementById('nomeProf').value;
      const emailDoForm = document.getElementById('email').value;

      if (codigoDoForm) { // Se o campo 'codigo' (ID) tem um valor, é uma atualização (PUT)
        updateProfessor(codigoDoForm, nomeDoForm, emailDoForm);
      } else { // Se o campo 'codigo' está vazio, é uma nova adição (POST)
        addProf(nomeDoForm, emailDoForm);
      }
    });

    // Carrega professores ao iniciar a página
    renderProf();
  });